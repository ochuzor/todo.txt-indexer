import Fuse from 'fuse.js';
import _ from 'lodash';
import { textToIndexDto, TodoIndexDto } from '@ochuzor/todo.txt-parser';

import { IdType, ITodoDoc, ITodoIndexer} from './todo-doc-types';

const options: Fuse.FuseOptions<TodoIndexDto> = {
    keys: [
        'description',
        'priority',
        'dateOfCreation',
        'dateOfCompletion',
        'projects',
        'contexts',
        'tags',
    ],
}

const indexDtoToTodoDoc = (dto: TodoIndexDto):ITodoDoc  => {
    return _.pick(dto, ['id', 'text']);
}

export class FuseJsTodoIndexer implements ITodoIndexer {
    private _isDataModified = true;
    private fuse: Fuse<ITodoDoc, Fuse.FuseOptions<TodoIndexDto>>;
    private _data: TodoIndexDto [] = [];

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
        }
        else {
            this._data.push(_doc);
        }
        this._isDataModified = true;
    }
    
    getDoc(id: IdType): ITodoDoc {
        const doc = this._data.find(doc => doc.id === id);
        if (!doc) return {id, text: ''};

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

    search(query: string): ITodoDoc[] {
        if (this._isDataModified) {
            this.fuse = new Fuse(this._data, options);
        }
        this._isDataModified = false;

        const _query = textToIndexDto(query);
        const opts = _.pickBy(_.omit(_query, ['description', 'id']), value => value.length > 0);

        if (!_.isEmpty(_query.description)) {
            const ls = this.fuse.search(_query.description);
            if (_.isEmpty(opts)) return _.map(ls, indexDtoToTodoDoc);

            return _.filter(ls, _.matches(opts))
                .map(indexDtoToTodoDoc);
        }

        // if description is empty and options are empty
        if (_.isEmpty(opts)) return [];
        return _.filter(this._data, _.matches(opts))
            .map(indexDtoToTodoDoc);
    }
}
