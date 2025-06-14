import React from 'react';
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteNoteThunk } from '../../redux/notes';
import { useNavigate } from "react-router-dom";
import './DeleteNoteModal.css';


interface DeleteNoteModalProps {
    noteId: number;
    notebookId: number;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ noteId, notebookId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(deleteNoteThunk(notebookId, noteId));
        closeModal();
        navigate(`/notebooks/${notebookId}/notes`);
    };

    return (
        <div className="note-delete-modal-container">
            <h1 className='note-delete-modal-confirm'>Confirm Delete</h1>
            <div className='delete-note-desc'>Are you sure you want to delete this note?</div>
            <button onClick={handleClickDelete} className="delete-note-button">
                Yes (Delete Note)
            </button>
            <button onClick={closeModal} className="keep-note-button">
                No (Keep Note)
            </button>
        </div>
    );
};

export default DeleteNoteModal;
