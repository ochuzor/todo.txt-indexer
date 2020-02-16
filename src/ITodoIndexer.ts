import { TodoIndexModel, IdType, TodoDocResponseModel } from './doc-interfaces';

export interface ITodoIndexer {
    addDoc(doc: TodoIndexModel): void;
    getDoc(id: IdType): TodoDocResponseModel | null;
    deleteDoc(id: IdType): void;
    getAll(): TodoDocResponseModel[];
    search(query: object): TodoDocResponseModel[];
}
