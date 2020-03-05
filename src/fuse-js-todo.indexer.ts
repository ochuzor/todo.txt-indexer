import Fuse from 'fuse.js';
import _ from 'lodash';
import { textToDto } from '@ochuzor/todo.txt-parser';

import { AbstractArrayTodoIndexer } from './abstract-array-todo-indexer';
import { ITodoDoc, IdType } from './todo-doc-types';

interface TodoFuseDoc extends ITodoDoc {
    description: string;
    projects: string[];
    contexts: string[];
    tags: string[];
}

const options: Fuse.FuseOptions<TodoFuseDoc> = {
    threshold: 0.3,
    keys: ['description', 'projects', 'contexts', 'tags'],
};

type TagDto = {
    name: string;
    value: string;
};

export const tagListToString = (tags: TagDto[]): string[] => {
    return tags.map(tag => `${tag.name}:${tag.value}`);
};

export class FuseJsTodoIndexer extends AbstractArrayTodoIndexer<TodoFuseDoc> {
    private _isDataModified = false;
    private fuse: Fuse<TodoFuseDoc, Fuse.FuseOptions<TodoFuseDoc>>;

    constructor(protected _data: TodoFuseDoc[] = []) {
        super(_data);
        this.fuse = new Fuse(this._data, options);
    }

    addDoc(doc: ITodoDoc): void {
        super.addDoc(doc);
        this._isDataModified = true;
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
            this._isDataModified = true;
        }
    }

    protected mapToIndexDoc(doc: ITodoDoc): TodoFuseDoc {
        const data = textToDto(doc.text);

        return {
            id: doc.id,
            text: doc.text,

            description: data.description,
            contexts: data.contexts,
            projects: data.projects,
            tags: tagListToString(data.tags),
        };
    }

    protected searchByTextList(lsTexts: string[]): TodoFuseDoc[] {
        return _.reduce(
            lsTexts,
            (acc, txt) => {
                const vals = this.fuse.search(txt) as TodoFuseDoc[];
                return _.unionBy(acc, vals, 'id');
            },
            [] as TodoFuseDoc[]
        );
    }

    search(query: string): ITodoDoc[] {
        if (this._isDataModified) {
            this.fuse = new Fuse(this._data, options);
        }
        this._isDataModified = false;

        const _query = textToDto(query);

        const filterList = _([
            _query.contexts,
            _query.projects,
            tagListToString(_query.tags),
        ])
            .filter(ls => ls.length > 0)
            .flatMap()
            .uniq()
            .value();

        if (_query.description.length > 0) {
            filterList.push(_query.description);
        }

        const result = this.searchByTextList(filterList);
        return result.map(this.mapFromIndexDoc);
    }
}
