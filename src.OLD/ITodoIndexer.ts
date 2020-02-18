import { TodoIndexModel, IdType, TodoDocResponseModel } from './doc-interfaces';

export interface ITodoIndexer {
    addDoc(doc: TodoIndexModel): void;
    getDoc(id: IdType): TodoDocResponseModel | null;
    deleteDoc(id: IdType): void;
    getAll(): TodoDocResponseModel[];
    search(query: object): TodoDocResponseModel[];
}

export interface IHasId {
    id: IdType;
}

export interface IHasText {
    text: string;
}

export interface TDummyTodo {
    id: IdType;
    text: string;

    name: string;
}


