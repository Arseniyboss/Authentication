import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const { signup } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
        default:
          return;
      }
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" ref={emailRef} id="email" />
        </div>
        <p className="error">{emailError}</p>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} id="password" />
        </div>
        <p className="error">{passwordError}</p>
        <div className="account">
          <button disabled={loading}>Sign Up</button>
          <p>
            Already have an account ?
            <Link to="signin" className="link">
              <span>Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
