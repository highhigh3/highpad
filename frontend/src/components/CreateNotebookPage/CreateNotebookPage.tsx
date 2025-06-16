import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotebookThunk } from "../../redux/notebooks";
import "./CreateNotebookPage.css";

interface INotebookErrors {
  title?: string;
}

const CreateNotebookPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState<INotebookErrors>({});

    // useEffect(() => {
    //     const newErrors: INotebookErrors = {};

    //     if (!title) {
    //     newErrors.title = "Title is required";
    //     } else if (title.length < 5) {
    //     newErrors.title = "Title must be at least 5 characters";
    //     } else if (title.length > 100) {
    //     newErrors.title = "Title must be less than 100 characters";
    //     }

    //     setErrors(newErrors);
    // }, [title]);

    useEffect(() => {
        const newErrors: INotebookErrors = {};
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            newErrors.title = "Title is required";
        } else if (trimmedTitle.length < 5) {
            newErrors.title = "Title must be at least 5 characters";
        } else if (trimmedTitle.length > 100) {
            newErrors.title = "Title must be less than 100 characters";
        }

        setErrors(newErrors);
        }, [title]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            // createNotebookThunk({ title })
            createNotebookThunk({ title: title.trim() })
        );

        if (!serverResponse) {
            navigate("/notebooks");
        }
    };

    return (
        <div className="create-notebook-container">
            <h1 className="create-header1">CREATE A NOTEBOOK</h1>
            <form onSubmit={handleSubmit}>
                <label className="create-title-label">
                    Title:
                    <input
                        className="create-title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <p className="error-message">{errors.title}</p>}
                <button 
                className="create-button"
                type="submit">Create Notebook</button>
            </form>
        </div>
    );
};

export default CreateNotebookPage;