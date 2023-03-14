import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/nav-bar/Navbar";
import Home from "./components/home/Home";
import Posts from "./components/posts/Posts";
import Login from "./components/login/Login";
import { getPosts, getUserDetails } from "./api";
import SignUp from "./components/sign-up/SignUp";
import SinglePost from "./components/posts/single-post/SinglePost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem("token");
    setToken("");
    window.reload();
  }

  const fetchPosts = async () => {
    const results = await getPosts();

    setPosts(results.data.posts);
  };

  const getMe = async () => {
    const storedToken = window.localStorage.getItem("token");
    if (!token) {
      if (storedToken) {
        setToken(storedToken);
      }
      return;
    }
    const results = await getUserDetails(token);
    if (results.success) {
      setUser(results.data);
    } else {
      console.log(results.error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  useEffect(() => {
    getMe();
  }, [token]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/posts"
          element={<Posts posts={posts} fetchPosts={fetchPosts} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} navigate={navigate} />}
        />
        <Route
          path="/signUp"
          element={<SignUp setToken={setToken} navigate={navigate} />}
        />
        <Route
          path="/posts/:id"
          element={
            <SinglePost
              posts={posts}
              token={token}
              navigate={navigate}
              getMe={getMe}
            />
          }
        />
      </Routes>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
