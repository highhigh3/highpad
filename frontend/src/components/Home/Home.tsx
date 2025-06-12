import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import "./Home.css";

const Home = () => {

  const user = useAppSelector ((state) => state.session.user);
  // console.log(user, "------->")

  return (
    <div className="home-container">
      <div className="home-main">
        <p className="home-main-p">Ready to start taking notes?</p>
        <h1 className="home-main-h1">Welcome to HighPad {user?.username}!</h1>

        {user && (
        <div className="home-buttons">
          <NavLink to="/notebooks" className="home-vnotebook">
            View Notebooks
          </NavLink>

          <NavLink to="/notebooks/create" 
            className="home-create-button">
            Create a New Notebook
          </NavLink>
        </div>
        )}
      </div>
    </div>
  );
};


export default Home;