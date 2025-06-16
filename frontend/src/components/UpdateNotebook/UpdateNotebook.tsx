import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllNotebooksThunk, updateNotebookThunk } from "../../redux/notebooks";
import { RootState, useAppSelector } from "../../redux/store";
import "./UpdateNotebook.css";

interface IUpdateNotebookErrors {
  title?: string;
}

const UpdateNotebook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const notebook = useAppSelector((state: RootState) => state.notebooks.byId[Number(id)]);
    // console.log(notebook, "-------->")
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState<IUpdateNotebookErrors>({});

    // useEffect(() => {
    //     const newErrors: IUpdateNotebookErrors = {};
    
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
        const newErrors: IUpdateNotebookErrors = {};
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

    useEffect(() => {
        if (!notebook) {
            dispatch(getAllNotebooksThunk());
        }
    }, [dispatch, notebook]);

    useEffect(() => {
        if (notebook) {
            setTitle(notebook.title);
        }
    }, [notebook]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    const serverResponse = await dispatch(
        updateNotebookThunk(Number(id), { 
            // title 
            title: title.trim()
        })
    );


    if (!serverResponse) {
        navigate("/notebooks");
    }
};

    return (
        <div className="update-notebook-container">
            <h1 className="update-header1">UPDATE NOTEBOOK PAGE</h1>
            <form onSubmit={handleSubmit}>
                <label className="update-title-label">
                    Title:
                    <input
                        className="update-title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {errors.title && <p className="error-message">{errors.title}</p>}
                <button 
                className="submit-button"
                type="submit">Update Notebook</button>
            </form>
        </div>
    );
};

export default UpdateNotebook;