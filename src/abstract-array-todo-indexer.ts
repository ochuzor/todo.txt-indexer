import { IdType, ITodoDoc, ITodoIndexer } from './todo-doc-types';

/**
 * Provides a base implementation for search libs that work on lists of documents.
 * Extend this and you have access to all the basic indexing functionalities. Just override
 * mapToIndexDoc and search functions and a new library is born :)
 */
export abstract class AbstractArrayTodoIndexer<TTodo extends ITodoDoc>
    implements ITodoIndexer {
    constructor(protected _data: TTodo[] = []) {}

    NextId(): IdType {
        return this._data.length;
    }

    addDoc(doc: ITodoDoc): void {
        const index = this._data.findIndex(d => d.id === doc.id);
        const _doc = this.mapToIndexDoc(doc);
        if (index !== -1) {
            this._data.splice(index, 1, _doc);
        } else {
            this._data.push(_doc);
        }
    }

    getDoc(id: IdType): ITodoDoc {
        const doc = this._data.find(doc => doc.id === id);
        if (!doc) return { id, text: '' };
        return this.mapFromIndexDoc(doc);
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
        }
    }

    getAll(): ITodoDoc[] {
        return this._data.map(this.mapFromIndexDoc);
    }

    protected mapFromIndexDoc(doc: TTodo): ITodoDoc {
        return {
            id: doc.id,
            text: doc.text,
        };
    }

    protected abstract mapToIndexDoc(doc: ITodoDoc): TTodo;
    abstract search(query: string): ITodoDoc[];
}
