import { IdType, ITodoDoc, ITodoIndexer } from './todo-doc-types';

export abstract class AbstractArrayTodoIndexer implements ITodoIndexer {
    constructor(protected _data: ITodoDoc[] = []) {}

    NextId(): IdType {
        return this._data.length;
    }

    addDoc(doc: ITodoDoc): void {
        const index = this._data.findIndex(d => d.id === doc.id);
        const cp = Object.assign({}, doc);
        if (index !== -1) {
            this._data.splice(index, 1, cp);
        } else {
            this._data.push(cp);
        }
    }

    getDoc(id: IdType): ITodoDoc {
        const doc = this._data.find(doc => doc.id === id);
        if (!doc) return { id, text: '' };
        return Object.assign({}, doc);
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
        }
    }

    getAll(): ITodoDoc[] {
        return this._data.map(doc => {
            return {
                id: doc.id,
                text: doc.text,
            };
        });
    }

    abstract search(query: string): ITodoDoc[];
}
