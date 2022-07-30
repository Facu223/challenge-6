import React from "react";
import { Link } from "react-router-dom";
import  NavbarStyles  from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <div className={NavbarStyles.wrapper_flex}>
        <h2>Mi blog!</h2>
        <ul>
        <li>
            <Link to="/"><button>Inicio</button></Link>
          </li>
          <li>
            <Link to="/Login"><button>Iniciar sesión</button></Link>
          </li>
          <li>
            <Link to="/AllPost"><button>Historias</button></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
