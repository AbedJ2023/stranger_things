const baseURL = "https://strangers-things.herokuapp.com/api/2211-FTB-ET-WEB-AM";

export const getPosts = async (token) => {
  try {
    const response = await fetch(`${baseURL}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = response.json();
    return results;
  } catch (error) {
    console.log("error getting all posts");
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const results = response.json();
    return results;
  } catch (error) {
    console.log("error registering user");
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const results = response.json();
    return results;
  } catch (error) {
    console.log("error logging in");
  }
};

export const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${baseURL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = response.json();
    return results;
  } catch (error) {
    console.log("this is an error message");
  }
};

export const createPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const response = await fetch(`${baseURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
          price: price,
          location: location,
          willDeliver: willDeliver,
        },
      }),
    });
    const results = response.json();
    return results;
  } catch (error) {
    console.log("this is an error message");
  }
};

export const updatePost = async ({
  token,
  title,
  description,
  price,
  location,
  willDeliver,
  _id,
}) => {
  try {
    const response = await fetch(`${baseURL}/posts/${[_id]}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error updating post");
  }
};

export const createMessage = async ({ postID, token, message }) => {
  try {
    const response = await fetch(`${baseURL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
      }),
    });
  } catch (error) {
    console.log("error creating message");
  }
};

export const deletePost = async (_id) => {
  try {
    const token = window.localStorage.token;
    const response = await fetch(`${baseURL}/posts/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log("this is an error message");
  }
};
