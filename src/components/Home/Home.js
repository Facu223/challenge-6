import React from "react";
import HomeStyles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={HomeStyles.wrapper_home}>
      <div className="home-title">
        <h1>Bienvenidos a mi Blog</h1>
        <p>
          Aquí podrás publicar tus historias y también ver las de los demás
          usuarios del resto del mundo. Ten en cuenta que para poder tener
          acceso a ciertas acciones en la página, deberás tener una sesión
          iniciada. En caso de no tener una cuenta para ingresar, registrate{" "}
          <Link to="/Register">
            <button>Aquí</button>
          </Link>
        </p>
      </div>
    </div>
  );
}
