// ------- Imports -------


// ------- General Types -------

export interface INote {
  id?: number;
  notebook_id: number;
  user_id?: number;
  title: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

export interface INoteState {
  byId: {
    [id: number]: INote;
  };
  allNotes: INote[];
}

export interface INoteAction {
  type: string;
  payload: any;
}

export interface ICreateNote {
  notebook_id: number;
  title: string;
  content?: string;
}

export interface IUpdateNote {
  title: string;
  content?: string;
}
