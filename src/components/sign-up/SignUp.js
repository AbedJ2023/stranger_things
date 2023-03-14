import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api";
import swal from "sweetalert";

import "./SignUp.css";

const SignUp = ({ setToken, navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const results = await registerUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem("token", results.data.token);
      swal("Congratulation!! account has been created");
      navigate("/posts");
    } else {
      swal("User already exists!", "Please login instead.");
    }
  };

  return (
    <main>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
          setUsername("");
          setPassword("");
        }}
      >
        <h3>Sign UP Please!</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          id="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button type="submit">Sign Up</button>
        <div className="signup">
          <div>Already have an account? </div>
          <Link to="/login" className="signUpLink">
            Please Login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
