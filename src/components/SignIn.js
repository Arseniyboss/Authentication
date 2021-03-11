import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const { signin } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setEmailError("");
      setPasswordError("");
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
          return;
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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
          <button>Sign In</button>
          <p>
            Don't have an account ?
            <Link to="signup" className="link">
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
