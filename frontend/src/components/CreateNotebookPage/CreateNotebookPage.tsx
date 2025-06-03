import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNotebookThunk } from "../../redux/notebooks";
import "./CreateNotebookPage.css";


const CreateNotebookPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            createNotebookThunk({ title })
        );

        if (!serverResponse) {
            navigate("/");
        }
    };

    return (
        <div className="create-notebook-page">
            <h1>WELCOME TO CREATE A NOTEBOOK PAGE</h1>
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
                <button type="submit">Create Notebook</button>
            </form>
        </div>
    );
};

export default CreateNotebookPage;
