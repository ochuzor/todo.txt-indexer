export type IdType = number | string;

export interface TodoBasicDocModel {
    id: IdType;
    text: string;
}

export interface TodoIndexModel extends TodoBasicDocModel {
    description: string;
    isCompleted: string;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string;
    contexts: string;
    tags: string;
}

export interface TodoDocResponseModel extends TodoBasicDocModel {}
