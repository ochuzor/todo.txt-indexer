import { IdType } from './doc-interfaces';
import { ITodoIndexerGeneric } from './ITodoIndexerGeneric';
import { TDummyTodo } from './ITodoIndexer';

export class DummyIndexer<TT extends TDummyTodo, UU extends TDummyTodo> implements ITodoIndexerGeneric<TT, UU> {
    private _data: TT[] = [];
    addDoc(doc: TT): void {
        const index = this._data.findIndex(d => d.id === doc.id);
        const cp = Object.assign({}, doc);
        if (index !== -1) {
            this._data.splice(index, 1, cp);
        }
        else {
            this._data.push(Object.assign({}, cp));
        }
    }
    getDoc(id: IdType): UU {
        throw new Error("Method not implemented.");
    }
    deleteDoc(id: IdType): void {
        throw new Error("Method not implemented.");
    }
    getAll(): UU {
        throw new Error("Method not implemented.");
    }
    search(query: string): UU[] {
        throw new Error("Method not implemented.");
    }
}
