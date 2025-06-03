import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllNotebooksThunk } from "../../redux/notebooks";
import "./AllNotebooks.css";
import { RootState, useAppSelector } from "../../redux/store";
import NotebookCard from "./NotebookCard";


const AllNotebooks = () => {
    const dispatch = useDispatch();
    const notebooks = useAppSelector((state: RootState) => state.notebooks.allNotebooks);
    // console.log("HERE ---->", notebooks)

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

    if (isLoaded) {
return (
    <div className="all-notebooks">
        <h1>All Notebooks</h1>
        {notebooks.length > 0 && notebooks.map((notebook, i) => (
            <div key={`${i}-${notebook.id}`}>
                <NotebookCard notebook = {notebook} />
            </div>
        ))}
    </div>
);
};
};


export default AllNotebooks;