import { ITodoIndexer, IdType } from './ITodoIndexer';

export interface TBasicTodoDoc {
    id: IdType;
    text: string;
}

export abstract class AbstractArrayTodoIndexer<TInputModel extends TBasicTodoDoc> 
    implements ITodoIndexer<TInputModel, TBasicTodoDoc> {

    protected _data: TInputModel[] = [];

    NextId(): IdType {
        return this._data.length;
    }

    addDoc(doc: TInputModel): void {
        const index = this._data.findIndex(d => d.id === doc.id);
        const cp = Object.assign({}, doc);
        if (index !== -1) {
            this._data.splice(index, 1, cp);
        }
        else {
            this._data.push(Object.assign({}, cp));
        }
    }

    getDoc(id: IdType): TBasicTodoDoc {
        const doc = this._data.find(doc => doc.id === id);
        if (!doc) return {id, text: ''};

        return doc;
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
        }
    }

    getAll(): TBasicTodoDoc[] {
        return this._data.map(doc => {
            return {
                id: doc.id,
                text: doc.text,
            };
        });
    }

    abstract search(query: string): TBasicTodoDoc[];
}
