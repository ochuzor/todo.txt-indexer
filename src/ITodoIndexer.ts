export type IdType = number | string;

export interface IHasId {
    id: IdType;
}

export interface IHasText {
    text: string;
}

export interface ITodoIndexer<TTodoIndexModel extends IHasId | IHasText, TTodoResponseModel extends IHasId | IHasText> {
    addDoc(doc: TTodoIndexModel): void;
    getDoc(id: IdType): TTodoResponseModel;
    deleteDoc(id: IdType): void;
    getAll(): TTodoResponseModel[];
    search(query: string): TTodoResponseModel[];
}
