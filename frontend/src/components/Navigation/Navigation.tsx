import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation():JSX.Element {
  return (
    <nav className="navigation">
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
    </nav> 
  );
}

export default Navigation;