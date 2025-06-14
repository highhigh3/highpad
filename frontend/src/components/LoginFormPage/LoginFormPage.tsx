import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAppSelector } from "../../redux/store";



function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useAppSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );


    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/home");
    }
  };

  const demoUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (!serverResponse) {
      navigate("/home");
    }
  };


  return (
    <div className="login-page-container">
      <h1 className="login-page-container-header">Log In</h1>
      {errors.length > 0 &&
        errors.map((message:string) => <p key={message}>{message}</p>)}
      <form onSubmit={(e) => handleSubmit(e)}
            className="login-form">
        <label className="email-label">
          Email
          <input
            className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="password-label">
          Password
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit"
                className="login-button"
        >Log In</button>
      </form>

      <button onClick={demoUser}
              className="demo-user-button"
      >Demo User</button>

    </div>
  );
}

export default LoginFormPage;