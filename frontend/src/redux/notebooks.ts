// ------- Imports -------

import { INotebook, INotebookState, INotebookAction, ICreateNotebook, IUpdateNotebook } from "./types/notebooks";


// ------- Action Types -------

const GET_ALL_NOTEBOOKS = 'notebooks/GET_ALL_NOTEBOOKS';
const CREATE_NOTEBOOK = 'notebooks/CREATE_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';


// ------- Action Creators -------

const getAllNotebooks = (notebooks: INotebook[]) => ({
    type: GET_ALL_NOTEBOOKS,
    payload: notebooks
});

const createNotebook = (notebook: INotebook[]) => ({
    type: CREATE_NOTEBOOK,
    payload: notebook
});

const updateNotebook = (notebook: INotebook) => ({
    type: UPDATE_NOTEBOOK,
    payload: notebook
})

const deleteNotebook = (notebook: number) => ({
    type: DELETE_NOTEBOOK,
    payload: notebook
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

export const createNotebookThunk = (notebook: ICreateNotebook): any => async (dispatch: any) => {
  try {
    const response = await fetch("/api/notebooks/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(createNotebook(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};

export const updateNotebookThunk = (notebookId: number, notebook: IUpdateNotebook): any => async (dispatch: any) => {
  try {
    const response = await fetch(`/api/notebooks/${notebookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook)
    });
    if (response.ok) {
      const data: INotebook = await response.json();
      dispatch(updateNotebook(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};

export const deleteNotebookThunk = (notebookId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteNotebook(notebookId));
    } else {
      throw res;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
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
            let newByIdGetAllNotebooks: { [id: number]: INotebook } = {};
            for (let notebook of notebooks) {
                newByIdGetAllNotebooks[notebook.id!] = notebook;
            }
            newState.byId = newByIdGetAllNotebooks;
            newState.allNotebooks = notebooks;
            return newState;

        case CREATE_NOTEBOOK:
            newState = { ...state };
            newState.allNotebooks = [...newState.allNotebooks, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };
            return newState;

        case UPDATE_NOTEBOOK:
            newState = { ...state };
            newState.allNotebooks = [...newState.allNotebooks, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };
            return newState;

        case DELETE_NOTEBOOK:
            newState = { ...state };
            newState.allNotebooks = state.allNotebooks.filter((notebook) => notebook.id !== action.payload);
            newState.byId = { ...state.byId };
            delete newState.byId[action.payload];
            return newState;

            
        default:
            return state;
    };
};

export default notebooksReducer;