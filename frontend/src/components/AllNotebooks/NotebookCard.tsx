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
            <NavLink to={`/notebooks/${notebook.id}/notes`} 
                     className="notebook-link">
                 <h2>{notebook.title}</h2>
            </NavLink>

            <NavLink
                to={`/notebooks/${notebook.id}/update`}
                className='update-button'
            >
                Update Notebook
            </NavLink>

            <OpenModalButton
                buttonText="Delete Notebook"
                className="delete-notebook-button-modal"
                modalComponent={<DeleteNotebookModal notebookId={notebook.id} />} 
                onButtonClick={undefined} 
                onModalClose={undefined} 
            />
        </div>
    );
};

export default NotebookCard;