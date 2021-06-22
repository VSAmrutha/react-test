import React from "react";

export default function AddNewPostBtn({ onClick }) {
  return (
    <button onClick={onClick} className="generic-btn button-tertiary">
      Add New Post
    </button>
  );
}
