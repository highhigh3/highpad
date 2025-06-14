import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteNotebookThunk } from '../../redux/notebooks';
import './DeleteNotebookModal.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

interface DeleteNotebookModalProps {
    notebookId: number;
}

const DeleteNotebookModal: React.FC<DeleteNotebookModalProps> = ({ notebookId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(deleteNotebookThunk(notebookId));
        closeModal();
        navigate("/notebooks");
    };

    return (
        <div className="notebook-delete-modal-container">
            <h1 className="cdelete-h1">Confirm Delete</h1>
            <div className="delete-detail-desc">Are you sure you want to delete this notebook?</div>
            <button onClick={handleClickDelete} className="delete-notebook-button">
                Yes (Delete Notebook)
            </button>
            <button onClick={closeModal} className="keep-notebook-button">
                No (Keep Notebook)
            </button>
        </div>
    );
};

export default DeleteNotebookModal;
