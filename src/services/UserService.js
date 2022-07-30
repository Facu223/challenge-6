// GET all users
export function getUser() {
  return fetch("http://localhost:3000/users").then((data) => data.json());
}

// POST one user
export function setUser(obj) {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  }).then((data) => data.json());
}
