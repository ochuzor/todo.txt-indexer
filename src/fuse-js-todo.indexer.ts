import Fuse from 'fuse.js';

import { AbstractArrayTodoIndexer } from './abstract-array-todo-indexer';
import { ITodoDoc, IdType } from './todo-doc-types';

const options: Fuse.FuseOptions<ITodoDoc> = {
    threshold: 0.3,
    keys: ['text'],
};

export class FuseJsTodoIndexer extends AbstractArrayTodoIndexer {
    private _isDataModified = true;
    private fuse: Fuse<ITodoDoc, Fuse.FuseOptions<ITodoDoc>>;

    constructor(protected _data: ITodoDoc[] = []) {
        super(_data);
        this.fuse = new Fuse(this._data, options);
    }

    addDoc(doc: ITodoDoc): void {
        super.addDoc(doc);
        this._isDataModified = true;
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
            this._isDataModified = true;
        }
    }

    search(query: string): ITodoDoc[] {
        if (this._isDataModified) {
            this.fuse = new Fuse(this._data, options);
        }
        this._isDataModified = false;

        const result = this.fuse.search(query) as ITodoDoc[];
        return result.map((doc: ITodoDoc) => ({ id: doc.id, text: doc.text }));
    }
}
