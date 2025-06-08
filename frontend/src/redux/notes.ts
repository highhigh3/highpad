// ------- Imports -------

import { ICreateNote, INote, INoteAction, INoteState, IUpdateNote } from "./types/notes";


// ------- Action Types -------

const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';
const CREATE_NOTE = 'notes/CREATE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';

// ------- Action Creators -------

const getAllNotes = (notes: INote[]) => ({
  type: GET_ALL_NOTES,
  payload: notes
});

const createNote = (note: INote) => ({
  type: CREATE_NOTE,
  payload: note
});

const updateNote = (note: INote) => ({
  type: UPDATE_NOTE,
  payload: note
});


// ------- Thunks -------

export const getAllNotesThunk = (notebookId: number): any => async (dispatch: any) => {
  try {
    const res = await fetch(`/api/notes/notebooks/${notebookId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllNotes(data));
      return data;
    } else {
      throw res;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};

export const createNoteThunk = (note: ICreateNote): any => async (dispatch: any) => {
  try {
    const response = await fetch(`/api/notes/notebooks/${note.notebook_id}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });

    if (response.ok) {
      const data: INote = await response.json();
      dispatch(createNote(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};

export const updateNoteThunk = (notebookId: number, id: number, note: IUpdateNote): any => async (dispatch: any) => {
  try {
    const response = await fetch(`/api/notes/notebooks/${notebookId}/notes/${id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });

    if (response.ok) {
      const data: INote = await response.json();
      dispatch(updateNote(data));
    } else {
      throw response;
    }
  } catch (e) {
    const err = e as Response;
    return await err.json();
  }
};


// ------- Normalizing State -------

const initialState: INoteState = {
  byId: {},
  allNotes: []
};


// ------- Reducer -------

function notesReducer(state = initialState, action: INoteAction): INoteState {
  let newState;
  switch (action.type) {

        case GET_ALL_NOTES:
            const notes = action.payload;
            newState = { ...state };
            let newByIdGetAllNotes: { [id: number]: INote } = {};
            for (let note of notes) {
                newByIdGetAllNotes[note.id] = note;
            }
            newState.byId = newByIdGetAllNotes;
            newState.allNotes = notes;
            return newState;

        case CREATE_NOTE:
            newState = { ...state };
            newState.allNotes = [...newState.allNotes, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };
            return newState;

        case UPDATE_NOTE:
            newState = { ...state };
            newState.allNotes = [...newState.allNotes, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };
            return newState;



    default:
      return state;
  }
};

export default notesReducer;