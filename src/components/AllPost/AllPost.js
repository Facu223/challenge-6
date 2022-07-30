import React, { useState, useEffect } from "react";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import { getPosts, setPost } from "../../services/PostService";
import { v4 as uuidv4 } from "uuid";
import AllPostStyles from "./AllPost.module.css";

export default function AllPost() {
  const [isCreated, setIsCreated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPost, setAllPost] = useState([]);

  // En caso de que el siguiente state sea true, se hace un fetch de las historias
  const [makeFetch, setMakeFetch] = useState(false);

  const postTitle = (event) => {
    setTitle(event.target.value);
  };

  const postContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (e) => {
    setIsCreated(false);
    e.preventDefault();
    if (title && content) {
      const id = uuidv4();
      const obj = { id, title, content };
      // Luego de crear un post, makeFetch pasa a true
      setPost(obj).then(() => setMakeFetch(true));
    }
  };

  // Cada vez que makeFetch se actualice a true, se realiza el fetch a los posts
  useEffect(() => {
    if (makeFetch === true) {
      getPosts().then((data) => {
        setAllPost(data);
        setMakeFetch(false);
      });
    }
  }, [makeFetch]);

  const onCreate = () => {
    setIsCreated(!isCreated);
  };

  if (isCreated) {
    return (
      <div>
        <CreatePost
          postTitle={postTitle}
          postContent={postContent}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  } else {
    return (
      <div className={AllPostStyles.stories_container}>
        <h2>Todas las Historias</h2>
        {allPost.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
          />
        ))}
        <button onClick={onCreate} className={AllPostStyles.button_add}>
          Agregar una historia
        </button>
      </div>
    );
  }
}
