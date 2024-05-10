import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";

const DisplayBlogPost = ({ blogpost }) => {
  const allBlogPosts = blogpost.get();

  const handleClickUpdate = (e) => {
    const selectedUserId =
      blogpost.get()[e.currentTarget.parentElement.className].postid;
  };

  const handleClickDelete = (e) => {
    let selectedPostId =
      blogpost.get()[parseInt(e.currentTarget.parentElement.className)].postid;
    console.log(
      blogpost.get()[parseInt(e.currentTarget.parentElement.className)]
    );
    axios
      .delete(`http://localhost:3000/blogposts/${selectedPostId}`)
      .then((res) => {
        console.log(res);
        blogpost.set(blogpost.get().filter((a) => a.postid !== selectedPostId));
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="displayPostMain">
      {allBlogPosts.map((post, index) => (
        <div key={index} className={index}>
          <EditOutlinedIcon
            onClick={(e) => {
              handleClickUpdate(e, index);
            }}
          />
          <DeleteOutlineOutlinedIcon
            onClick={(e) => {
              handleClickDelete(e);
            }}
          />
          <h3>{post.posttitle}</h3>
          <p>By: {post.username}</p>
          <p>{post.postcontent}</p>
          <p>Posted on: {post.datetime}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DisplayBlogPost;
