import Fuse from 'fuse.js';

import { AbstractArrayTodoIndexer } from '../array-todo.indexer';
import {
    TodoIndexModel,
    TodoDocResponseModel,
    IdType,
} from '../doc-interfaces';

const options: Fuse.FuseOptions<TodoIndexModel> = {
    keys: [
        'description',
        'priority',
        'dateOfCreation',
        'dateOfCompletion',
        'projects',
        'contexts',
        'tags',
    ],
};

export class FuseJsTodoIndexer extends AbstractArrayTodoIndexer {
    private fuse: Fuse<TodoIndexModel, Fuse.FuseOptions<TodoIndexModel>>;
    constructor(_data: TodoIndexModel[] = []) {
        super(_data);
        this.fuse = new Fuse(_data, options);
    }

    addDoc(doc: TodoIndexModel): void {
        super.addDoc(doc);
        this.fuse = new Fuse(this._data, options);
    }

    deleteDoc(id: IdType): void {
        super.deleteDoc(id);
        this.fuse = new Fuse(this._data, options);
    }

    search(query: object): TodoDocResponseModel[] {
        this.fuse.search(query.toString());
        throw new Error('Method not implemented.' + query);
    }
}
