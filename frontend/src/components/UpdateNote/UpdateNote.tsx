import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import { getAllNotesThunk, updateNoteThunk } from "../../redux/notes";
import "./UpdateNote.css";

const UpdateNote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { notebookId } = useParams<{ notebookId: string }>();

    const note = useAppSelector((state: RootState) => state.notes.byId[Number(id)]);
    // console.log(note, "----->");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
      if (!note) {
        dispatch(getAllNotesThunk(Number(notebookId)));
      }
    }, [dispatch, note, notebookId]);

    useEffect(() => {
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }, [note]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const serverResponse = await dispatch(
        updateNoteThunk(Number(notebookId), Number(id), {
          title,
          content,
          notebook_id: Number(notebookId),
        })
      );

      if (!serverResponse) {
        navigate(`/notebooks/${notebookId}/notes`);
      }
};

  return (
    <div className="update-note-page">
      <h1>Update Note</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={5}
            maxLength={255}
          />
        </label>

        <label>
          Content (optional)
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
          />
        </label>

        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
