// ------- Imports -------


// ------- General Types -------

export interface INotebook {
    id?: number;
    user_id?: number;
    title: string;
    created_at?: string;
    updated_at?: string;
}

export interface INotebookState {
    byId: {
        [id: number]: INotebook;
    };
    allNotebooks: INotebook[];
}

export interface INotebookAction {
    type: string;
    payload: any;
}

export interface ICreateNotebook {
    title: string
}