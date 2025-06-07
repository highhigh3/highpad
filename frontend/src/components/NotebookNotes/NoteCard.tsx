import './NoteCard.css';
import { INote } from '../../redux/types/notes';

interface NoteCardProps {
  note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
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
      <div className="note-meta">
      </div>
    </div>
  );
};

export default NoteCard;
