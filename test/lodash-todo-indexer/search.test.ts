import { LodashTodoIndexer } from '../../src/lodash-todo.indexer';
import { generateDoc } from '../../src/utils';

describe('', () => {
    let index: any;
    beforeEach(() => {
        index = new LodashTodoIndexer();
    });

    it('should search by', () => {
        const doc = generateDoc({
            id: 1,
            text: 'first doc',
            description: 'first description',
            projects: 'work',
        });
        const doc2 = generateDoc({
            id: 2,
            text: 'second doc',
            description: 'a vague story',
            projects: 'home',
        });
        const doc3 = generateDoc({
            id: 3,
            text: 'third doc',
            description: 'something',
            projects: 'school',
        });
        const doc4 = generateDoc({
            id: 4,
            text: 'fourth doc',
            description: 'something',
            projects: 'cleanup',
        });

        index.addDoc(doc);
        index.addDoc(doc2);
        index.addDoc(doc3);
        index.addDoc(doc4);

        // const query = { description: 'home', projects: 'school' };
        const query = { description: 'something', projects: 'cleanup' };
        // const query = { description: 'something', };
        const result = index.search(query);
        // expect(result).toEqual([{ id: 2, text: 'second doc' }]);
        expect(result).toBeNull();
    });
});
