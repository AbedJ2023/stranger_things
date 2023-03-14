import { Paper } from "@mui/material";
import { Button } from "bootstrap";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { createMessage } from "../../../api";

const SendMessage = ({ postID, token, navigate }) => {
  const [message, setMessage] = useState({ content: "" });
  // we need 3 things to make this request
  // Post-id, token, message object containing the content of the message

  const addMessage = async (ev) => {
    await createMessage({ postID, message, token });
  };

  return (
    <form
      className="message-form"
      onSubmit={(ev) => {
        ev.preventDefault();
        addMessage();
        document.querySelector(".message-form").reset();
        swal(
          "Message Sent!",
          "Check back on the profile page to see all inbound and outbound messages!"
        );
      }}
    >
      <input
        type="text"
        placeholder="Enter Message"
        onChange={(ev) => setMessage({ content: ev.target.value })}
      />
      <Button type="submit">Send Message</Button>
    </form>
  );
};

const SinglePost = ({ posts, token }) => {
  const [activateMessage, setActivateMessage] = useState(false);
  const { id } = useParams();

  const currentPost = posts.find((post) => String(post._id) === id);
  const { title, description, location, price, willDeliver } = currentPost;

  return (
    <Paper style={{ margin: "1rem" }} elevation={5}>
      <div>
        <h3 className="post-title">{title}</h3>
        <p className="post-description">Description: {description}</p>
        <p className="post-price">Price: {price}</p>
        <p className="post-location">Location: {location}</p>
        <p className="post-will-deliver">
          Will Deliver: {willDeliver == true ? "Yes" : "No"}
        </p>
      </div>
      <Button onClick={() => setActivateMessage(!activateMessage)}>
        Message this user
      </Button>
      {activateMessage && <SendMessage postID={id} token={token} />}
    </Paper>
  );
};

export default SinglePost;
