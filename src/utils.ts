import { TodoIndexModel } from '../src/doc-interfaces';

export function generateDoc(opts: object = {}): TodoIndexModel {
    const data = {
        description: '',
        isCompleted: '',
        priority: '',
        dateOfCreation: '',
        dateOfCompletion: '',
        projects: '',
        contexts: '',
        tags: '',
    } as TodoIndexModel;

    return Object.assign(data, opts);
}
