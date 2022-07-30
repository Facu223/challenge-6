import { useContext } from "react";
import UserStyles from "./User.module.css";
import UserContext from "./UserContext";

const User = () => {
  const { existingUser, currentUser } = useContext(UserContext);

  // currentUser obtiene el usuario ya "loggeado", a traves de context, para luego mostrar el nombre en la app.
  return (
    <h1 className={UserStyles.welcome}>
      {existingUser ? <p>Bienvenido/a {currentUser.name}</p> : <p>Bienvenido/a invitado/a</p>}
    </h1>
  );
};

export default User;
