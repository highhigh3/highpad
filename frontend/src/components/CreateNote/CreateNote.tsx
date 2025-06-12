import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createNoteThunk } from "../../redux/notes";

interface INoteErrors {
  title?: string;
  content?: string;
}

const CreateNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: notebookId } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<INoteErrors>({});

  useEffect(() => {
      const newErrors: INoteErrors = {};
    
      if (!title) {
      newErrors.title = "Title is required";
      } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
      } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
      }

      if (!content) {
        newErrors.content = "Content is required";
      } 
    
      setErrors(newErrors);
  }, [title, content]);

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
            />
          </label>
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div>
          <label>
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          {errors.content && <p className="error-message">{errors.content}</p>}
        </div>

        <button type="submit">Create Note</button>

      </form>
    </div>
  );
};

export default CreateNote;
