import './NoteCard.css';
import { INote } from '../../redux/types/notes';
import { useNavigate } from 'react-router-dom';

interface NoteCardProps {
  note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate(`/notebooks/${note.notebook_id}/notes/${note.id}/update`);
  };


  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">
        {(() => {
          if (note.content) {
            return note.content;
          } else {
            return 'No content provided.';
          }
        })()}
      </p>
      <div className="note-button">

        <button onClick={handleUpdateClick}>Update</button>

      </div>
    </div>
  );
};

export default NoteCard;
