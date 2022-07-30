import { React, useState, useEffect, useContext } from "react";
import UserContext from "../User/UserContext";
import { getUser } from "../../services/UserService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginStyles from "./Login.module.css";

export default function Login() {
  const {
    setEmail,
    setPassword,
    user,
    setExistingUser,
    existingUser,
    setCurrentUser,
    setUserLogged,
    setUserUnlogged,
  } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Con finIndex verifica que el usuario exista. 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (users) {
      const filteredUser = users.findIndex(
        (usuario) =>
          usuario.email === user.email && usuario.password === user.password
      );
      // Si el usuario existe, se redirige a AllPost
      if (filteredUser > -1) {
        setExistingUser(true);
        setCurrentUser(users[filteredUser]);
        navigate("/AllPost");
        setUserLogged(true);
      } else {
        setExistingUser(false);
      }
    }
  };

  useEffect(() => {
    getUser().then((data) => setUsers(data));
  }, []);

  // En caso de que el usuario ingrese datos incorrectos, "existingUser" pasa a ser "false"
  // Y muestra una alerta. El siguiente useEffect es para que esa alerta solo dure 2 segundos. 
  useEffect(() => {
    if (existingUser === false) {
      setTimeout(() => {
        setExistingUser();
      }, 2000);
    }
  }, [existingUser, setExistingUser]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // "setUserUnlogged" pasa a "true" para mostrar una alerta de sesión cerrada.
  const deleteUser = () => {
    setExistingUser();
    setPassword("");
    setEmail("");
    setUserUnlogged(true);
  };

  return (
    <div className={LoginStyles.wrapper}>
      {existingUser ? (
        <>
          <p>Sesión ya iniciada, ¿Desea cerrarla?</p>
          <button onClick={deleteUser} className={LoginStyles.sign_off}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <div>
          <h3>Por favor, inicie sesión: </h3>
          <form onSubmit={handleSubmit}>
            <fieldset className={LoginStyles.fieldset_style}>
              <label htmlFor="email">
                <input
                  type="email"
                  placeholder="Escriba su dirección de correo"
                  onChange={handleChangeEmail}
                />
              </label>
              <br />
              <label htmlFor="password">
                <input
                  type="password"
                  placeholder="Escriba su contraseña"
                  onChange={handleChangePassword}
                />
              </label>
            </fieldset>
            <button className={LoginStyles.login_button}>Ingresar</button>{" "}
            <Link to="/Register">
              <button type="button" className={LoginStyles.register_button}>
                Registrarse
              </button>
            </Link>
          </form>
        </div>
      )}
      {existingUser === false ? (
        <h3 className={LoginStyles.invalid_data}>Datos invalidos</h3>
      ) : null}
    </div>
  );
}
