import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateNotebookThunk } from "../../redux/notebooks";
import { RootState, useAppSelector } from "../../redux/store";
import "./UpdateNotebook.css";

const UpdateNotebook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const notebook = useAppSelector((state: RootState) => state.notebooks.byId[Number(id)]);
    const [title, setTitle] = useState("");


    useEffect(() => {
        if (notebook) {
            setTitle(notebook.title);
        }
    }, [notebook]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    const serverResponse = await dispatch(
        updateNotebookThunk(Number(id), { 
            title 
        })
    );


    if (!serverResponse) {
        navigate("/");
    }
};

    return (
        <div className="update-notebook-page">
            <h1>UPDATE NOTEBOOK PAGE</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Notebook</button>
            </form>
        </div>
    );
};

export default UpdateNotebook;