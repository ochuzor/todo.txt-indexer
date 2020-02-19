import fs from 'fs';
import path from 'path';
import { FuseJsTodoIndexer } from '../src/fuse-js-todo.indexer';

const fixturesTxtFile = path.join(__dirname, './fixtures/todo-docs.txt');
const todoDocsTxt = fs.readFileSync(fixturesTxtFile, 'utf8');
const docs = todoDocsTxt
    .split('\n')
    .filter(txt => !!txt.trim())
    .map((txt, i) => ({ id: i + 1, text: txt.trim() }));

describe('FuseJsTodoIndexer', () => {
    let indexer: FuseJsTodoIndexer;
    beforeEach(() => {
        indexer = new FuseJsTodoIndexer();
        docs.forEach(doc => indexer.addDoc(doc));
    });

    it('should search by', () => {
        const result = indexer.search(' @phone');
        console.log('result:', JSON.stringify(result));
        expect(result).toBeNull();
    });
});
