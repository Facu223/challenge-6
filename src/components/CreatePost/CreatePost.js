import React from "react";
import CreatePostStyles from "./CreatePost.module.css";

export default function CreatePost({ postTitle, postContent, handleSubmit }) {
  return (
    <div>
      <h2>Crear Historia</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className={CreatePostStyles.fieldset_style}>
          <label>
            <input
              type="text"
              placeholder="Escriba un título"
              required
              onChange={postTitle}
            />
          </label>
          <br />
          <label>
            <textarea
              type="text"
              placeholder="Escriba una historia"
              required
              onChange={postContent}
            />
            <br />
            <button type="submit" className={CreatePostStyles.button_add}>
              Guardar
            </button>
          </label>
        </fieldset>
      </form>
    </div>
  );
}
