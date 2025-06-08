import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createNoteThunk } from "../../redux/notes";

const CreateNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: notebookId } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      createNoteThunk({
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
    <div className="create-note-page">
      <h1>WELCOME TO CREATE A NOTE PAGE</h1>

      <form onSubmit={handleSubmit}>
        <div>
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
        </div>

        <div>
          <label>
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={1000}
            />
          </label>
        </div>

        <button type="submit">Create Note</button>

      </form>
    </div>
  );
};

export default CreateNote;
