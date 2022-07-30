import React from "react";
import PostStyles from "./Post.module.css";

export default function Post({ title, content }) {
  return (
    <div className={PostStyles.wrapper}>
      <h3>Título: <b>{title}</b></h3>
      <p>{content}</p>
    </div>
  );
}
