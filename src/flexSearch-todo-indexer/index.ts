import { cloneDeep, map } from 'lodash';

import { ITodoIndexer } from '../ITodoIndexer';
import {
    TodoIndexModel,
    TodoDocResponseModel,
    IdType,
} from '../doc-interfaces';
import FlexSearch from 'flexsearch';

const defaultOptions = {
    doc: {
        id: 'id',
        field: [
            'description',
            'priority',
            'dateOfCreation',
            'dateOfCompletion',
            'projects',
            'contexts',
            'tags',
        ],
        store: ['id', 'text'],
    },
};

export function buildQuery(query: object) {
    return map(query, (value, key) => {
        return {
            field: key,
            query: value,
        };
    });
}

export class FlexSearchTodoIndexer implements ITodoIndexer {
    private _indexer: any;
    constructor(opts: object) {
        this._indexer = FlexSearch.create(opts);
    }

    static FromDefaults() {
        return new FlexSearchTodoIndexer(defaultOptions);
    }

    addDoc(doc: TodoIndexModel): void {
        this._indexer.add(doc);
    }

    getDoc(id: IdType): TodoDocResponseModel {
        return cloneDeep(this._indexer.find(id));
    }

    deleteDoc(id: IdType): void {
        this._indexer.remove({ id });
    }

    getAll(): TodoDocResponseModel[] {
        const docs = this._indexer.where(() => true);
        return docs as TodoDocResponseModel[];
    }

    search(query: object): TodoDocResponseModel[] {
        const _query = buildQuery(query);
        return cloneDeep(this._indexer.search(_query));
    }
}
