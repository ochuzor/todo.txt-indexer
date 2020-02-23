A javascript indexer library for [todo.txt](https://github.com/todotxt/todo.txt). It provides classes for easily holding a list of todo items in memory and searching through them.

```
npm i @ochuzor/todo.txt-indexer
```
It provides ITodoIndexer interface and (currently) two implementations.
```typescript
export interface ITodoIndexer {
    addDoc(doc: ITodoDoc): void;
    getDoc(id: IdType): ITodoDoc;
    deleteDoc(id: IdType): void;
    getAll(): ITodoDoc[];
    search(query: string): ITodoDoc[];
}
```

The addDoc method adds a new document to the index. If the item already exists in the index, it will be replaced. 

The first implementation, AbstractArrayTodoIndexer is an abstract class that implements all the methods except the search method. The main idea is to provide a base class for the other functionalities and then you can go about implementing the search functionality as you wish. A class that extends AbstractArrayTodoIndexer has access to the enter data array via _data field, which is a protected field.

The other class, FuseJsTodoIndexer implements all the methods, including the search functionality. The search is implemented using the beautiful [Fuse.js library](https://fusejs.io/). Basic usage the class:
```typescript
import { FuseJsTodoIndexer } from '@ochuzor/todo.txt-indexer';

const indexer = new FuseJsTodoIndexer();

// to add a document
indexer.addDoc({id: 100, text: 'x call Jerry'});

// to delete a document
indexer.deleteDoc(id);

// to get a document
const todo = indexer.getDoc(id);

// to get a list of all the documents
const lsTodos = indexer.getAll();

// to search 
const searchResults = indexer.search('search string');
```
If an item is not found, getDoc returns A [null object](https://en.wikipedia.org/wiki/Null_object_pattern). The object has the supplied id, but an empty text field.

The search methods accepts a string as query. Treat the search query as a todo item. The search functionality is not that good though. It might be improved in the future. So, to search for all completed items that have "call Tom in it", with "phone" as a context, use
```
x call Tom @phone
```

Take a look at the code and tests.