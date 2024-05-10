import React from "react";

let currentUser = null;

function setCurrentUser(user) {
  currentUser = user;
}

function getCurrentUser() {
  return currentUser;
}

let existingPost = [null];

function setExistingPost(postData) {
  console.log("postData:", postData);
  existingPost.push(postData);
}

function getExistingPost() {
  return existingPost;
}

export { setCurrentUser, getCurrentUser, setExistingPost, getExistingPost };
