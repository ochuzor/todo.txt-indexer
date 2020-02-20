import path from 'path';
import { FuseJsTodoIndexer } from '../../src/fuse-js-todo.indexer';

import { loadDocFromTextFile } from '../fixtures';

const fixturesTxtFile = path.join(__dirname, '../fixtures/todo-docs.txt');
const docs = loadDocFromTextFile(fixturesTxtFile);

describe('FuseJsTodoIndexer.getDoc', () => {
    let indexer: FuseJsTodoIndexer;
    beforeEach(() => {
        indexer = new FuseJsTodoIndexer();
        docs.forEach(doc => indexer.addDoc(doc));
    });

    it('should get a doc that exists in the index', () => {
        const doc = docs[0];
        const docFound = indexer.getDoc(doc.id);
        expect(docFound).toEqual(doc);
    });

    it('should return a Non-Null null object if doc is not found', () => {
        const id = 2000;
        const doc = indexer.getDoc(id);
        expect(doc).not.toBeNull();
        expect(doc.text).toBe('');
        expect(doc.id).toBe(id);
    });
});
