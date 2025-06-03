import "./NotebookCard.css";
import { INotebook } from "../../redux/types/notebooks";

interface NotebookCardProps {
    notebook: INotebook;
}

const NotebookCard = ({ notebook }: NotebookCardProps): JSX.Element => {
    return (
        <div className="notebook-card">
            <h2>{notebook.title}</h2>
            <p>User ID: {notebook.user_id}</p>
            <p>Notebook ID: {notebook.id}</p>
        </div>
    );
};

export default NotebookCard;