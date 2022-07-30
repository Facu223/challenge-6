// GET all posts
export function getPosts() {
  return fetch("http://localhost:3000/posts").then((data) => data.json());
}

// POST one post
export function setPost(obj) {
  return fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((data) => data.json());
}
