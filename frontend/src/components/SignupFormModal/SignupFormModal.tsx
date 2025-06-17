import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupFormModal.css";



interface ISignUpErrors {
  server?: any;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}


function SignupFormModal() {
  const dispatch = useDispatch();
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
  const { closeModal } = useModal();

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
      closeModal();
    }
  };

      const autoFill = () => {
      setEmail("signup@aa.com");
      setUsername("SpongeBob");
      setPassword("password");
      setConfirmPassword("password");
    };

  return (
    <div className="signup-form-modal-container">
      <h1 className="sign-up-header">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label className="signup-email-label">
          Email
          <input
            className="signup-email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="signup-username-label">
          Username
          <input
            className="signup-username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error-message">{errors.username}</p>}
        <label className="signup-password-label">
          Password
          <input
            className="signup-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <label className="signup-cpassword-label">
          Confirm Password
          <input
            className="signup-cpassword-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        <button 
        className="modal-signup-button"
        type="submit">Sign Up</button>

        <button 
        className="autofill-button"
        type="button" onClick={autoFill}>AUTO-FILL</button>

      </form>
    </div>
  );
}

export default SignupFormModal;