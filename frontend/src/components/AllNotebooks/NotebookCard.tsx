import "./NotebookCard.css";
import { INotebook } from "../../redux/types/notebooks";
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import DeleteNotebookModal from "../DeleteNotebookModal/DeleteNotebookModal";

interface NotebookCardProps {
    notebook: INotebook;
}

const NotebookCard = ({ notebook }: NotebookCardProps): JSX.Element => {
    return (
        <div className="notebook-card">
            <h2>{notebook.title}</h2>
            <p>User ID: {notebook.user_id}</p>
            <p>Notebook ID: {notebook.id}</p>

            <NavLink
                to={`/notebooks/${notebook.id}/update`}
                className='update-delete-button'
            >
                Update Notebook
            </NavLink>

            <OpenModalButton
                buttonText="Delete Notebook"
                modalComponent={<DeleteNotebookModal notebookId={notebook.id!} />} onButtonClick={undefined} onModalClose={undefined} 
            />
        </div>
    );
};

export default NotebookCard;
