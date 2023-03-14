import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ logout, token }) => {
  return (
    <nav>
      <div className="brand">
        <h3>Stranger's Things</h3>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="posts">Posts</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          {token ? (
            <Link to="/" onClick={() => logout()}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
