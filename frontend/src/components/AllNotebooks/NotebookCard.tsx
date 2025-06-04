import "./NotebookCard.css";
import { INotebook } from "../../redux/types/notebooks";
import { NavLink } from 'react-router-dom';

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

        </div>
    );
};

export default NotebookCard;