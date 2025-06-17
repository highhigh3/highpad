import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkLogin, thunkSignup } from "../../redux/session";
import { useAppSelector } from "../../redux/store";
import "./SignupFormPage.css"


interface ISignUpErrors {
  server?: any;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useAppSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ISignUpErrors>({
    server: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.endsWith(".com")) {
      return setErrors({
        email:
        "Must be a Valid Email Address"
      });
    }

    if (username.length < 3) {
      return setErrors({
        username:
        "Username must be at least 3 characters long"
      });
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

    const autoFill = () => {
      setEmail("signup@aa.com");
      setUsername("SpongeBob");
      setPassword("password");
      setConfirmPassword("password");
    };


  return (
    <div className="signup-page-container">
      <h1 className="signup-header">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form 
      className="signup-form"
      onSubmit={(e) => handleSubmit(e)}>
        <label className="email-form-label">
          Email
          <input
            className="email-form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="username-form-label">
          Username
          <input
            className="username-form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        <label className="password-form-label">
          Password
          <input
            className="password-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="cp-form-label">
          Confirm Password
          <input
            className="cp-form-password-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        <button 
        className="submit-formpage-button"
        type="submit">Sign Up</button>

        <button 
        className="autofill-button"
        type="button" onClick={autoFill}>AUTO-FILL</button>

      </form>
    </div>
  );
}

export default SignupFormPage;