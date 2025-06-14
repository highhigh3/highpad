import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useAppSelector } from "../../redux/store";
import "./Navigation.css";
// import { useDispatch } from "react-redux";
// import { thunkLogout } from "../../redux/session";

function Navigation(): JSX.Element {
  const user = useAppSelector((state) => state.session.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();


  // const handleLogout = async () => {
  //   await dispatch(thunkLogout());
  //   navigate("/");
  // };


  return (
    <nav className="navigation">
      <ul>
    <li className="nav-user-wrapper">
      <ProfileButton />
      <h1 className="nav-hello">{user?.username}</h1>
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

        {!user && (
          <li>
            <NavLink to="/" className="button-login">
              <img 
                src="/images/icons8-login-50.png" 
                className="button-login2" 
                alt="Home Icon" 
              />
            Login
            </NavLink>
          </li>
        )}

        {!user && (
          <li>
            <NavLink to="/signup" className="button-signup">
              <img 
                src="/images/icons8-add-24.png" 
                className="button-signup2" 
                alt="Home Icon" 
              />
            SignUp
            </NavLink>
          </li>
        )}

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
          <NavLink to="/notebooks/create" className="nav-create">
            <img 
              src="/images/icons8-notebook-32.png" 
              className="nav-create1" 
              alt="Create Notebook Icon" 
            />
            Create Notebook
          </NavLink>
        </li>

        </>
        )}        

      </ul>
    </nav>
  );
}

export default Navigation;