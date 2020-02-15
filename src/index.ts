type IdType = number | string;

interface TodoDoc {
    id: IdType;
    description: string;
    isCompleted: string;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string;
    contexts: string;
    tags: string;
}

interface ITodoIndexer {
	addDoc(doc: TodoDoc): void;
	getDoc(id: IdType): TodoDoc;
	deleteDoc(id: IdType): void;
    getAll(): TodoDoc[];
    search(query: object): TodoDoc[];
}
