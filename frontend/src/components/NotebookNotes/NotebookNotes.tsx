import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllNotesThunk } from '../../redux/notes';
import { useAppSelector } from '../../redux/store';
import NoteCard from './NoteCard';
import "./NotebookNotes.css"


const NotebookNotes = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const notes = useAppSelector(state => state.notes.allNotes);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        const getNotes = async () => {
            await dispatch(getAllNotesThunk(Number(id)));
            setIsLoaded(true);
        };
        if (!isLoaded) {
            getNotes();
        }
    }, [dispatch, id, isLoaded]);

  return (
    <div className="notebook-notes-container">
      <h1>Notes</h1>

      <button 
        className='create-note-button'
        onClick={() => navigate(`/notebooks/${id}/notes/create`)}>
        Create New Note
      </button>

      <div className="note-list">
        {notes.length > 0 && notes.map((note, i) => (
          <NoteCard key={`${i}-${note.id}`} note={note} />
        ))}
        {notes.length === 0 && <p className="no-notes-message">No notes found.</p>}
      </div>
    </div>
  );
};

export default NotebookNotes;
