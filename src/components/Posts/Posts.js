import React, { useEffect, useState } from "react";
import AddNewPostBtn from "./AddNewPostBtn";
export default function Posts() {
  const newPostDefaultValues = { title: "", body: "" };
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(newPostDefaultValues);
  const [postFormIsVisible, setPostFormIsVisible] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([data, ...posts]);
      });
    setNewPost(newPostDefaultValues);
    setPostFormIsVisible(false);
  };
  const handleOnCancel = () => {
    window.scrollTo(0, 0);
    setPostFormIsVisible(false);
    setNewPost(newPostDefaultValues);
  };
  return (
    <div className="posts">
      {/* <button onClick={() => setPostFormIsVisible(true)}>Add New Post</button> */}
      <h1 className="h1 center">Posts</h1>
      <div className="addposts">
        {!postFormIsVisible && (
          <AddNewPostBtn onClick={() => setPostFormIsVisible(true)} />
        )}
      </div>
      <div className="formposts">
        {postFormIsVisible && (
          <form className="form" onSubmit={submitForm}>
            <h3 className="h3">New Post</h3>
            <label>Title</label>
            <input
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              type="text"
              value={newPost.title}
              className="input"
            />
            <br />
            <label>Body</label>
            <textarea
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              row="7"
              value={newPost.body}
              className="textarea"
            />
            <br />
            <button className="generic-btn button-submit" type="submit">
              Submit
            </button>
            <button
              className="generic-btn button-cancel"
              type="button"
              onClick={handleOnCancel}
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <ul className="ulPosts">
        {posts.map((post, index) => {
          return (
            <li className="liPosts" key={index}>
              <h3 className="h3">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          );
        })}
        <li></li>
      </ul>
    </div>
  );
}
