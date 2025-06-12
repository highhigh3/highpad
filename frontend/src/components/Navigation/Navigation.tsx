import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useAppSelector } from "../../redux/store";
import "./Navigation.css";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";

function Navigation(): JSX.Element {
  const user = useAppSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await dispatch(thunkLogout());
    navigate("/");
  };

  const createNotebook = () => {
    navigate('/notebooks/create');
  };

  return (
    <nav className="navigation">
      <ul>

        <li>
          <NavLink to="/">Login</NavLink>
        </li>

        <li>
          <NavLink to="/home" className="nav-home">
            <img 
              src="/images/icons8-home-64.png" 
              className="nav-home2" 
              alt="Home Icon" 
            />
            Home
          </NavLink>
        </li>

        {user && (
          <>

          <NavLink to="/notebooks" className="nav-notebook">
            <img 
              src="/images/icons8-notebook-50.png" 
              className="nav-notebook2" 
              alt="Notebook Icon" 
            />
            Notebooks
          </NavLink>

        <li>
          <button onClick={handleLogout} className="nav-logout">
            {/* <img 
              src="/images/icons8-logout-24.png" 
              alt="Log Out Icon" 
              className="nav-logout" 
            /> */}
            Log Out
          </button>
        </li>

            <li>
              <button onClick={createNotebook}>
                Create Notebook
              </button>
            </li>  
          </>
        )}

        <li>
          <ProfileButton />
        </li>

      </ul>
    </nav>
  );
}

export default Navigation;
