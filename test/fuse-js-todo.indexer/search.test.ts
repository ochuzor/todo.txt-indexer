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

    it('should search by priority', () => {
        const result = indexer.search('(A)');
        expect(result).toHaveLength(6);
        const hasPriority = result.every(doc => doc.text.includes('(A) '));
        expect(hasPriority).toBeTruthy();
    });

    it('should search an empty index', () => {
        indexer = new FuseJsTodoIndexer();
        expect(indexer.getAll()).toHaveLength(0);
        expect(indexer.search('call mom')).toHaveLength(0);
    });

    it('should search with contexts', () => {
        const result = indexer.search('@GroceryStore');
        const containsWord = result.every(doc =>
            doc.text.includes('GroceryStore')
        );
        expect(containsWord).toBeTruthy();
    });

    it('should search with projects', () => {
        const result = indexer.search('+TodoTxtTouch');
        const containsWord = result.every(doc =>
            doc.text.includes('TodoTxtTouch')
        );
        expect(containsWord).toBeTruthy();
    });

    it('should search with description', () => {
        const result = indexer.search('xylophone');
        const containsWord = result.every(doc =>
            doc.text.includes('xylophone')
        );
        expect(containsWord).toBeTruthy();
    });

    it('should search with isCompleted', () => {
        const result = indexer.search('x');
        const allStartsWithX = result.every(doc => doc.text.startsWith('x'));
        expect(allStartsWithX).toBeTruthy();
    });

    it('should search with multiple words', () => {
        const term = 'Call Mom';
        const result = indexer.search(term);
        const allContainsWord = result.every(doc => doc.text.includes(term));
        expect(allContainsWord).toBeTruthy();
    });

    it('should search by date of creation', () => {
        const term = '2011-03-02';
        const result = indexer.search(term);
        const allContainsWord = result.every(doc => doc.text.includes(term));
        expect(allContainsWord).toBeTruthy();
    });

    it('should search with priority and description', () => {
        const term = '(A) Call Mom';
        const result = indexer.search(term);
        let allContainsWord = result.every(doc => doc.text.includes('(A)'));
        expect(allContainsWord).toBeTruthy();

        allContainsWord = result.every(doc => doc.text.includes('Call Mom'));
        expect(allContainsWord).toBeTruthy();
    });
});
