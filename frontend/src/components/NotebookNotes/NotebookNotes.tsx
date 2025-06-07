import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllNotesThunk } from '../../redux/notes';
import { useAppSelector } from '../../redux/store';
import NoteCard from './NoteCard';


const NotebookNotes = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const notes = useAppSelector(state => state.notes.allNotes);
//   console.log(notes, "----->")
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div>
      <h1>Notes for Notebook {id}</h1>
        {notes.length > 0 && notes.map((note, i) => (
        <div key={`${i}-${note.id}`}>
            <NoteCard note={note} />
        </div>
        ))}
        {notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
};

export default NotebookNotes;
