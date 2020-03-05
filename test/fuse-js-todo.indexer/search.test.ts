import path from 'path';
import { FuseJsTodoIndexer } from '../../src/fuse-js-todo.indexer';

import { loadDocFromTextFile } from '../fixtures';

const fixturesTxtFile = path.join(__dirname, '../fixtures/todo-docs.txt');
const docs = loadDocFromTextFile(fixturesTxtFile);

describe('FuseJsTodoIndexer.search', () => {
    let indexer: FuseJsTodoIndexer;
    beforeEach(() => {
        indexer = new FuseJsTodoIndexer();
        docs.forEach(doc => indexer.addDoc(doc));
    });

    it('should search an empty index', () => {
        indexer = new FuseJsTodoIndexer();
        expect(indexer.getAll()).toHaveLength(0);
        expect(indexer.search('call mom')).toHaveLength(0);
    });

    it('should search with contexts', () => {
        const result = indexer.search('@GroceryStore');

        expect(result.length).toBeGreaterThan(0);
        const containsWord = result.every(doc =>
            doc.text.includes('GroceryStore')
        );
        expect(containsWord).toBeTruthy();
    });

    it('should search with projects', () => {
        const result = indexer.search('+TodoTxtTouch');

        expect(result.length).toBeGreaterThan(0);
        const containsWord = result.every(doc =>
            doc.text.includes('TodoTxtTouch')
        );
        expect(containsWord).toBeTruthy();
    });

    it('should search with description', () => {
        const result = indexer.search('xylophone');

        expect(result.length).toBeGreaterThan(0);
        const containsWord = result.every(doc =>
            doc.text.includes('xylophone')
        );
        expect(containsWord).toBeTruthy();
    });

    it('should search with multiple words', () => {
        const term = 'Call Mom';
        const result = indexer.search(term);

        expect(result.length).toBeGreaterThan(0);
        const allContainsWord = result.every(doc =>
            doc.text.toLocaleLowerCase().includes('call mom')
        );
        expect(allContainsWord).toBeTruthy();
    });
});
