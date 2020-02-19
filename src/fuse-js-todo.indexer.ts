import Fuse from 'fuse.js';
import _ from 'lodash';
import { textToIndexDto, TodoIndexDto } from '@ochuzor/todo.txt-parser';

import { IdType, ITodoDoc, ITodoIndexer } from './todo-doc-types';

const options: Fuse.FuseOptions<TodoIndexDto> = {
    threshold: 0.4,
    keys: [
        // 'isCompleted',
        // 'priority',
        // 'dateOfCreation',
        // 'dateOfCompletion',
        'description',
        'projects',
        'contexts',
        'tags',
    ],
};

const indexDtoToTodoDoc = (dto: TodoIndexDto): ITodoDoc => {
    return _.pick(dto, ['id', 'text']);
};

interface SearchFilterOpts {
    priority?: string;
    dateOfCreation?: string;
    dateOfCompletion?: string;
    isCompleted?: string;
}

const getOpts = (dto: TodoIndexDto): SearchFilterOpts => {
    const opts = _.pick(dto, [
        'priority',
        'dateOfCreation',
        'dateOfCompletion',
        'isCompleted',
    ]);
    return _.pickBy(opts, value => value.length > 0);
};

const filterByOptions = (lsData: ITodoDoc[], options: SearchFilterOpts) => {
    return _.filter(lsData, _.matches(options));
};

export class FuseJsTodoIndexer implements ITodoIndexer {
    private _isDataModified = true;
    private fuse: Fuse<ITodoDoc, Fuse.FuseOptions<TodoIndexDto>>;
    private _data: TodoIndexDto[] = new Array<TodoIndexDto>();

    constructor() {
        this.fuse = new Fuse(this._data, options);
    }

    NextId(): IdType {
        return this._data.length;
    }

    addDoc(doc: ITodoDoc): void {
        const _doc = textToIndexDto(doc.text);
        _doc.id = doc.id;

        const index = this._data.findIndex(d => d.id === _doc.id);
        if (index !== -1) {
            this._data.splice(index, 1, _doc);
        } else {
            this._data.push(_doc);
        }
        this._isDataModified = true;
    }

    getDoc(id: IdType): ITodoDoc {
        const doc = this._data.find(doc => doc.id === id);
        if (!doc) return { id, text: '' };

        return indexDtoToTodoDoc(doc);
    }

    deleteDoc(id: IdType): void {
        const index = this._data.findIndex(d => d.id === id);
        if (index !== -1) {
            this._data.splice(index, 1);
            this._isDataModified = true;
        }
    }

    getAll(): ITodoDoc[] {
        return this._data.map(indexDtoToTodoDoc);
    }

    protected searchByTextList(lsTexts: string[]): ITodoDoc[] {
        return _.reduce(
            lsTexts,
            (acc, txt) => {
                const vals = this.fuse.search(txt) as ITodoDoc[];
                return _.unionBy(acc, vals, 'id');
            },
            [] as ITodoDoc[]
        );
    }

    search(query: string): ITodoDoc[] {
        if (this._isDataModified) {
            this.fuse = new Fuse(this._data, options);
        }
        this._isDataModified = false;

        const _query = textToIndexDto(query);
        const opts = getOpts(_query);

        const filterList = _.filter(
            [_query.description, _query.contexts, _query.projects],
            Boolean
        );

        if (filterList.length > 0) {
            let result = this.searchByTextList(filterList);
            if (!_.isEmpty(opts)) result = filterByOptions(result, opts);
            return result.map(indexDtoToTodoDoc);
        }

        // if description is empty and options are empty
        if (_.isEmpty(opts)) return [];

        return filterByOptions(this._data, opts).map(indexDtoToTodoDoc);
    }
}
