// ------- Imports -------

import { INote, INoteAction, INoteState } from "./types/notes";


// ------- Action Types -------

const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';

// ------- Action Creators -------

const getAllNotes = (notes: INote[]) => ({
  type: GET_ALL_NOTES,
  payload: notes
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



    default:
      return state;
  }
};

export default notesReducer;