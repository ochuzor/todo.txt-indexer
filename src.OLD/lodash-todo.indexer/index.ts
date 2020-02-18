import { pick, omit, matches, sortBy, get, stubTrue } from 'lodash';

import { AbstractArrayTodoIndexer } from '../array-todo.indexer';
import { TodoIndexModel, TodoDocResponseModel } from '../doc-interfaces';

function fuzzy(str: string, s: string): boolean {
    var hay = str.toLowerCase(),
        i = 0,
        n = -1,
        l;
    s = s.toLowerCase();
    for (; (l = s[i++]); ) if (!~(n = hay.indexOf(l, n + 1))) return false;
    return true;
}

function fuzzWithDoc(description: string, doc: TodoIndexModel): boolean {
    if (description.length < doc.description.length) {
        return fuzzy(doc.description, description);
    }

    return fuzzy(description, doc.description);
}

export class LodashTodoIndexer extends AbstractArrayTodoIndexer {
    constructor(_data: TodoIndexModel[] = []) {
        super(sortBy(_data, ['id']));
    }

    search(query: object): TodoDocResponseModel[] {
        const _query = omit(query, ['description']);
        const description = get(query as TodoIndexModel, 'description', '');
        const fuzzyfn =
            description === '' ? stubTrue : fuzzWithDoc.bind(null, description);

        return this._data
            .filter(fuzzyfn)
            .filter(matches(_query))
            .map(doc => pick(doc, ['id', 'text']));
    }
}
