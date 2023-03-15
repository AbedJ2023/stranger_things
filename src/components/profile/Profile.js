import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import "./Profile.css";

const Profile = ({ user, getMe }) => {
  const { username } = user;
  const messages = user.messages;
  const userID = user._id;

  // useEffect(() => {
  //   getMe();
  // }, [user]);

  return (
    <div
      style={{
        marginBottom: "1rem",
        marginLeft: "5rem",
        marginRight: "5rem",
        paddingBottom: "0.01rem",
      }}
    >
      <h1 className="welcome-message">Welcome {username}</h1>
      <h2 className="received-messages-h2">Received Messages:</h2>
      {messages &&
        messages.map((message) => {
          const fromUserID = message.fromUser._id;
          const { username } = message.fromUser;
          const { title } = message.post;

          if (userID !== fromUserID) {
            return (
              <Paper style={{ margin: "0.5rem" }} elevation={3}>
                <div key={message._id}>
                  <p>From User: {username} </p>
                  <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p>
                </div>
              </Paper>
            );
          }
        })}
      <h2 className="sent-messages-h2">Sent Messages:</h2>
      {messages &&
        messages.map((message) => {
          const fromUserID = message.fromUser._id;
          const { title } = message.post;

          if (userID === fromUserID) {
            return (
              <Paper style={{ margin: "0.5rem" }} elevation={3}>
                <div key={message._id}>
                  <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p>
                </div>
              </Paper>
            );
          }
        })}
    </div>
  );
};

export default Profile;
