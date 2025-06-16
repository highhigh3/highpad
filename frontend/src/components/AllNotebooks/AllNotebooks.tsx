import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllNotebooksThunk } from "../../redux/notebooks";
import "./AllNotebooks.css";
import { RootState, useAppSelector } from "../../redux/store";
import NotebookCard from "./NotebookCard";
import { useNavigate } from "react-router-dom";


const AllNotebooks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notebooks = useAppSelector((state: RootState) => state.notebooks.allNotebooks);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getAllNotebooks = async () => {
            await dispatch(getAllNotebooksThunk());
            setIsLoaded(true);
        };
        if (!isLoaded) {
            getAllNotebooks();
        }
    }, [dispatch, isLoaded, notebooks]);

    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else {

  return (
    <div className="all-notebooks-container">
      <h1>Notebooks</h1>

      <button 
        className='create-notebook-button'
        onClick={() => navigate(`/notebooks/create`)}>
        Create New Notebook
      </button>

      {notebooks.length > 0 &&
        notebooks.map((notebook, i) => (
          <div key={`${i}-${notebook.id}`}>
            <NotebookCard notebook={notebook} />
          </div>
        ))}
    </div>
  );
};
};


export default AllNotebooks;