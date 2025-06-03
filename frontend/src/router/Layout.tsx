import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout():JSX.Element {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (

      <ModalProvider>
      <div className="nav-wrapper"> 
      <div className="nav-container-left">
        <Navigation />
      </div>
      <main className="main-container">
        {isLoaded && <Outlet />}
      </main> 
      </div>   
        <Modal />
      </ModalProvider>

  );
}
