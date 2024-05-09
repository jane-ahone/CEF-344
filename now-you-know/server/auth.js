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
  existingPost = postData;
}

function getExistingPost() {
  return existingPost;
}

export { setCurrentUser, getCurrentUser, setExistingPost, getExistingPost };
