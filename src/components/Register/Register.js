import React, { useState } from "react";
import { setUser } from "../../services/UserService";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import RegisterStyles from "./Register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // En caso de que el usuario se registre, se lo redirige al Login.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password) {
      const id = uuidv4();
      const obj = { id, name, email, password };
      setUser(obj).then();
      navigate("/Login");
    }
  };

  return (
    <div className={RegisterStyles.wrapper}>
      <h2>Por favor, regístrese aquí</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className={RegisterStyles.fieldset_style}>
          <label htmlFor="name">
            <input
              type="text"
              placeholder="Escriba su nombre"
              onChange={handleChangeName}
            />
          </label>{" "}
          <br />
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Escriba su dirección de correo"
              onChange={handleChangeEmail}
            />
          </label>{" "}
          <br />
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Escriba su contraseña"
              onChange={handleChangePassword}
            />
          </label>
        </fieldset>
        <button type="submit" className={RegisterStyles.send_button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
