import { ITodoIndexer } from '../ITodoIndexer';
import {
    IdType,
    TodoIndexModel,
    TodoDocResponseModel,
} from '../doc-interfaces';

export abstract class AbstractArrayTodoIndexer implements ITodoIndexer {
    constructor(public _data: TodoIndexModel[] = []) {}

    NextId(): number {
        return this._data.length;
    }

    addDoc(doc: TodoIndexModel): void {
        const index = this._data.findIndex(d => d.id === doc.id);
        const cp = Object.assign({}, doc);

        if (index !== -1) {
            this._data.splice(index, 1, cp);
        } else {
            this._data.push(Object.assign({}, cp));
        }
    }

    getDoc(id: IdType): TodoDocResponseModel | null {
        return this._data.find(doc => doc.id === id) || null;
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
        }
    }

    getAll(): TodoDocResponseModel[] {
        return this._data.map(doc => {
            return {
                id: doc.id,
                text: doc.text,
            };
        });
    }

    abstract search(query: object): TodoDocResponseModel[];
}
