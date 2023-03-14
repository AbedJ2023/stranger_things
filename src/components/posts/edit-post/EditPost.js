import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updatePost } from "../../../api";

const EditPost = ({ posts, token, navigate, fetchPosts }) => {
  const [newTitle, setNewTitle] = useState("");
  const { id } = useParams();

  const [currentPost] = posts.filter((post) => post._id === id);
  const { title, description, location, price, willDeliver } = currentPost;
  const [newDescription, setNewDescription] = useState(description);
  const [newLocation, setNewLocation] = useState(location);
  const [newPrice, setNewPrice] = useState(price);
  const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

  const editPost = async () => {
    try {
      const updatedPost = {
        token: token,
        title: newTitle,
        description: newDescription,
        location: newLocation,
        price: newPrice,
        willDeliver: newWillDeliver,
        _id: id,
      };
      await updatePost(updatedPost);
      fetchPosts();
      navigate("/posts");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        editPost();
      }}
    >
      <div className="create-post-form">
        <h1>Edit Post</h1>
        <TextField
          style={{ width: "30rem" }}
          required
          label="Title"
          placeholder={title}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <TextField
          style={{ width: "30rem" }}
          required
          label="Description"
          placeholder={description}
          onChange={(event) => setNewDescription(event.target.value)}
        />
        <TextField
          style={{ width: "30rem" }}
          required
          label="Price"
          placeholder={price}
          onChange={(event) => setNewPrice(event.target.value)}
        />
        <TextField
          style={{ width: "30rem" }}
          required
          label="Location"
          placeholder={location}
          onChange={(event) => setNewLocation(event.target.value)}
        />
        <FormControlLabel
          label="Will you deliver?"
          control={
            <Checkbox
              onClick={(event) => {
                if (willDeliver === true) {
                  setWillDeliver(false);
                } else {
                  setWillDeliver(true);
                }
              }}
            />
          }
        />
        <Button type="submit" variant="outlined" style={{ width: "30rem" }}>
          Edit Post
        </Button>
      </div>
    </Box>
  );
};

export default EditPost;
