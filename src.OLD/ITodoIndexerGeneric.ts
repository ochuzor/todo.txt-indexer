import { IdType } from './doc-interfaces';
import { IHasId, IHasText } from './ITodoIndexer';

export interface ITodoIndexerGeneric<TTodoIndexModel extends IHasId | IHasText, TTodoResponseModel extends IHasId | IHasText> {
    addDoc(doc: TTodoIndexModel): void;
    getDoc(id: IdType): TTodoResponseModel;
    deleteDoc(id: IdType): void;
    getAll(): TTodoResponseModel;
    search(query: string): TTodoResponseModel[];
}
