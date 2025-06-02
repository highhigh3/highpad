import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllNotebooksThunk } from "../../redux/notebooks";
import { INotebook } from "../../redux/types/notebooks";
import "./AllNotebooks.css";
import { RootState, useAppSelector } from "../../redux/store";


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
            <div>
                <h1>All Notebooks</h1>
                {notebooks && notebooks.length > 0 &&
                    notebooks.map((notebook: INotebook, i: number) => (
                        <div key={`${i}-${notebook.id}`}>
                            <h2>{notebook.title}</h2>
                            <p>User ID: {notebook.user_id}</p>
                            <p>Notebook ID: {notebook.id}</p>
                        </div>
                    ))
                }
            </div>
        );
    } else {
      <h1>NO NOTEBOOKS</h1>
    }
};


export default AllNotebooks;