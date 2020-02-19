import { IdType, ITodoDoc as ITodo, ITodoIndexer } from './todo-doc-types';

export abstract class AbstractArrayTodoIndexer implements ITodoIndexer {
    constructor(protected _data: ITodo[] = []) {}

    NextId(): IdType {
        return this._data.length;
    }

    addDoc(doc: ITodo): void {
        const index = this._data.findIndex(d => d.id === doc.id);
        const cp = Object.assign({}, doc);
        if (index !== -1) {
            this._data.splice(index, 1, cp);
        } else {
            this._data.push(Object.assign({}, cp));
        }
    }

    getDoc(id: IdType): ITodo {
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

    getAll(): ITodo[] {
        return this._data.map(doc => {
            return {
                id: doc.id,
                text: doc.text,
            };
        });
    }

    abstract search(query: string): ITodo[];
}
