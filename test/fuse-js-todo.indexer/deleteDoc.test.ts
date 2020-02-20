import path from 'path';
import { FuseJsTodoIndexer } from '../../src/fuse-js-todo.indexer';

import { loadDocFromTextFile } from '../fixtures';

const fixturesTxtFile = path.join(__dirname, '../fixtures/todo-docs.txt');
const docs = loadDocFromTextFile(fixturesTxtFile);

describe('FuseJsTodoIndexer.deleteDoc', () => {
    let indexer: FuseJsTodoIndexer;
    beforeEach(() => {
        indexer = new FuseJsTodoIndexer();
        docs.forEach(doc => indexer.addDoc(doc));
    });

    it('should have one less doc in index after a delete', () => {
        const countBefore = indexer.getAll().length;
        const doc = docs[0];
        indexer.deleteDoc(doc.id);
        const countAfter = indexer.getAll().length;
        expect(countAfter).toEqual(countBefore - 1);
    });

    it('should not find a doc after deleting it', () => {
        const doc = docs[0];
        const docFound = indexer.getDoc(doc.id);
        expect(docFound).toEqual(doc);
        indexer.deleteDoc(doc.id);
        expect(indexer.getDoc(doc.id).text).toBe('');
    });

    it('should not be a problem to delete a doc twice', () => {
        const doc = docs[0];
        const docFound = indexer.getDoc(doc.id);
        expect(docFound).toEqual(doc);
        indexer.deleteDoc(doc.id);
        indexer.deleteDoc(doc.id);
        expect(indexer.getDoc(doc.id).text).toBe('');
    });

    it('should not be a problem to delete non-found doc', () => {
        const id = 2000;
        const doc = indexer.getDoc(id);
        expect(doc).not.toBeNull();
        expect(doc.text).toBe('');
        expect(doc.id).toBe(id);
        indexer.deleteDoc(id);
        expect(indexer.getDoc(id).text).toBe('');
    });
});
