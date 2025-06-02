// ------- Imports -------

import { INotebook, INotebookState, INotebookAction } from "./types/notebooks";


// ------- Action Types -------

const GET_ALL_NOTEBOOKS = 'notebooks/GET_ALL_NOTEBOOKS';


// ------- Action Creators -------

const getAllNotebooks = (notebooks: INotebook[]) => ({
    type: GET_ALL_NOTEBOOKS,
    payload: notebooks
})


// ------- Thunks -------

export const getAllNotebooksThunk = (): any => async (dispatch: any) => {
    try {
        const res = await fetch('/api/notebooks');
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllNotebooks(data));
            return data.Notebooks;
        } else {
            throw res;
        }
    } catch (e) {
        const err = e as Response;
        return (await err.json());
    }
};


// ------- Normalizing State -------

const initialState: INotebookState = {
  byId: {},
  allNotebooks: []
};


// ------- Reducer -------

function notebooksReducer(state = initialState, action: INotebookAction) {
    let newState;
    switch (action.type) {


        case GET_ALL_NOTEBOOKS:
            const notebooks = action.payload;
            newState = { ...state };
            newState.allNotebooks = notebooks;
            return newState;




        default:
            return state;
    };
};

export default notebooksReducer;