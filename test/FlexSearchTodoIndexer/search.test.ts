import { FlexSearchTodoIndexer } from '../../src/flexSearch-todo-indexer';
import { generateDoc } from '../../src/utils';

describe('FlexSearchTodoIndexer.search', () => {
    let index: any;
    beforeEach(() => {
        index = FlexSearchTodoIndexer.FromDefaults();
    });

    it('should search by description', () => {
        const doc = generateDoc({
            id: 1,
            text: 'first doc',
            description: 'first description',
            projects: 'project vague',
        });
        const doc2 = generateDoc({
            id: 2,
            text: 'second doc',
            description: 'a vague story',
            projects: 'project two',
        });
        const doc3 = generateDoc({
            id: 3,
            text: 'third doc',
            description: 'third description',
            projects: 'project three',
        });

        index.addDoc(doc);
        index.addDoc(doc2);
        index.addDoc(doc3);

        const result = index.search({ description: 'vague' });
        expect(result).toEqual([{ id: 2, text: 'second doc' }]);
    });

    it('should search by projects', () => {
        const doc = generateDoc({
            id: 1,
            text: 'first doc',
            projects: 'work career',
        });
        const doc2 = generateDoc({
            id: 2,
            text: 'second doc',
            projects: 'social',
        });

        index.addDoc(doc);
        index.addDoc(doc2);

        const result = index.search({ projects: 'social' });
        expect(result).toEqual([{ id: 2, text: 'second doc' }]);
    });

    /*
    it('should search by isCompleted:false', () => {
        const doc = generateDoc({
            id: 1, 
            text: 'first doc',
            description: 'first description',
            isCompleted: 'true',
            projects: 'project vague'});
        const doc2 = generateDoc({
            id: 2, 
            text: 'second doc',
            description: 'a vague story',
            isCompleted: 'true',
            projects: 'project two'});
        const doc3 = generateDoc({
            id: 3, 
            text: 'third doc', 
            description: 'third description',
            isCompleted: 'false',
            projects: 'project three'});

        index.addDoc(doc);
        index.addDoc(doc2);
        index.addDoc(doc3);
    
        const result = index.search({isCompleted: 'false'});
        expect(result).toEqual([{id: 2, text: 'second doc'}]);
    });
    // */
});
