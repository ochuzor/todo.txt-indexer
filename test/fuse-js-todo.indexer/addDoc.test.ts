import path from 'path';
import { FuseJsTodoIndexer } from '../../src/fuse-js-todo.indexer';

import { loadDocFromTextFile } from '../fixtures';

const fixturesTxtFile = path.join(__dirname, '../fixtures/todo-docs.txt');
const docs = loadDocFromTextFile(fixturesTxtFile);

describe('FuseJsTodoIndexer.addDoc', () => {
    let indexer: FuseJsTodoIndexer;
    beforeEach(() => {
        indexer = new FuseJsTodoIndexer();
        docs.forEach(doc => indexer.addDoc(doc));
    });

    it('should should add a doc', () => {
        const countBefore = indexer.getAll().length;
        indexer.addDoc({ id: countBefore + 1, text: 'test adding docs @test' });
        const countAfter = indexer.getAll().length;
        expect(countAfter).toEqual(countBefore + 1);
    });

    it('shoule replace an existing doc', () => {
        const doc = { id: 101, text: 'write a test for @test' };
        indexer.addDoc(doc);
        const res1 = indexer.getDoc(doc.id);
        expect(res1.text).toBe('write a test for @test');

        doc.text = 'added the test for @test';
        indexer.addDoc(doc);
        const res2 = indexer.getDoc(doc.id);
        expect(res2.text).toBe('added the test for @test');
    });
});
