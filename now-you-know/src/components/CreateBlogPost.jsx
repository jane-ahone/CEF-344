import React from "react";
import { useState } from "react";
import axios from "axios";
import "./CreateBlogPost.css";

const CreateBlogPost = ({ blogpost }) => {
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  const handleClick = () => {
    axios
      .post("http://localhost:3000/posts", values)
      .then((res) => {
        console.log(res);
        const prevPost = blogpost.get();
        prevPost.isEditing = false;
        blogpost.set([...prevPost, res.data.data]);
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="createBlogPostMain">
      <h2>Jane's Blog</h2>
      <label htmlFor="title">Title</label>
      <input
        required
        id="title"
        size={20}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      ></input>
      <label htmlFor="postcontent">Content</label>
      <input
        required
        id="postcontent"
        name="postcontent"
        placeholder="What are your thoughts"
        type="text"
        onChange={(e) => setValues({ ...values, content: e.target.value })}
      ></input>
      <button onClick={handleClick}>Publish Post</button>
    </div>
  );
};

export default CreateBlogPost;
