import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import { getAllNotesThunk, updateNoteThunk } from "../../redux/notes";
import "./UpdateNote.css";

interface INoteErrors {
  title?: string;
  content?: string;
}

const UpdateNote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { notebookId } = useParams<{ notebookId: string }>();

    const note = useAppSelector((state: RootState) => state.notes.byId[Number(id)]);
    // console.log(note, "----->");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState<INoteErrors>({});

  //   useEffect(() => {
  //       const newErrors: INoteErrors = {};
      
  //       if (!title) {
  //       newErrors.title = "Title is required";
  //       } else if (title.length < 5) {
  //       newErrors.title = "Title must be at least 5 characters";
  //       } else if (title.length > 100) {
  //       newErrors.title = "Title must be less than 100 characters";
  //       }

  //       if (!content) {
  //         newErrors.content = "Content is required";
  //       } 
    
  //     setErrors(newErrors);
  // }, [title, content]);

    useEffect(() => {
        const newErrors: INoteErrors = {};
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle) {
          newErrors.title = "Title is required";
        } else if (trimmedTitle.length < 5) {
          newErrors.title = "Title must be at least 5 characters";
        } else if (trimmedTitle.length > 100) {
          newErrors.title = "Title must be less than 100 characters";
        }

        if (!trimmedContent) {
          newErrors.content = "Content is required";
        }

        setErrors(newErrors);
      }, [title, content]);

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

      // const serverResponse = await dispatch(
      //   updateNoteThunk(Number(notebookId), Number(id), {
      //     title,
      //     content,
      //     notebook_id: Number(notebookId),
      //   })
      // );

    const serverResponse = await dispatch(
        updateNoteThunk(Number(notebookId), Number(id), {
          title: title.trim(),
          content: content.trim(),
          notebook_id: Number(notebookId),
        })
      );

      if (!serverResponse) {
        navigate(`/notebooks/${notebookId}/notes`);
      }
};

  return (
    <div className="update-note-container">
      <h1 className="update-note-header1">Update Note</h1>

      <form onSubmit={handleSubmit}>
        <label className="update-note-title-label">
          Title
          <input
            className="update-note-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={5}
            maxLength={255}
          />
        </label>
        {errors.title && <p className="error-message">{errors.title}</p>}

        <label className="update-note-content-label">
          Content
          <textarea
            className="update-note-content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
          />
        </label>
        {errors.content && <p className="error-message">{errors.content}</p>}

        <button 
        className="update-submit-button"
        type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
