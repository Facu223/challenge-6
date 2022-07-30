// Comando para simular la base de datos con json-server
// json-server --watch db.json 

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Register from "../Register/Register";
import CreatePost from "../CreatePost/CreatePost";
import AllPost from "../AllPost/AllPost";
import NotFound from "../NotFound/NotFound";
import UserContext from "../User/UserContext";
import User from "../User/User";
import AppStyles from "./App.module.css";

function App() {
  // States para logueo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Este estado le permite saber a la app si el usuario existe. En ese caso lo redirigirá a "AllPosts"
  const [existingUser, setExistingUser] = useState();

  // Este estado me trae el usuario logeado, en caso de que exista en la BD
  const [currentUser, setCurrentUser] = useState({});

  // Estos dos estados sirven para alertar al usuario cuando si se inició o cerro una sesión correctamente
  // Si los estados son "true", muestran la alerta
  const [userLogged, setUserLogged] = useState();
  const [userUnlogged, setUserUnlogged] = useState();

  // Este es el user que la persona ingresa a la hora de "loggearse", para luego verificar si los datos son correctos
  let user = { email, password };
  
  useEffect(() => {
    // Esto permite que la alerta de "sesion iniciada", solo dure 2 segundos
    if (userLogged === true) {
      setTimeout(() => {
        setUserLogged(false);
      }, 2000);
    }

    // Esto permite que la alerta de "sesion cerrada", solo dure 2 segundos
    if (userUnlogged === true) {
      setTimeout(() => {
        setUserUnlogged(false);
      }, 2000);
    }
  }, [userLogged, userUnlogged, setUserLogged]);

  return (
    <Router>
      <UserContext.Provider
        value={{
          setPassword,
          setEmail,
          email,
          password,
          user,
          setExistingUser,
          existingUser,
          setCurrentUser,
          currentUser,
          setUserLogged,
          userLogged,
          setUserUnlogged,
        }}
      >
        <div className="wrapper">
          <Navbar />
          <p
            className={
              userUnlogged ? AppStyles.unlogged : AppStyles.message_unlogged
            }
          >
            {userUnlogged ? "Sesión cerrada correctamente" : null}
          </p>
          <p
            className={userLogged ? AppStyles.logged : AppStyles.message_logged}
          >
            {userLogged ? "Sesión iniciada correctamente" : null}
          </p>
          <User />
          <Routes>
            <Route
              path="/CreatePost"
              element={<Navigate to="/Login" replace />}
            />
            {existingUser ? (
              <Route path="/AllPost" element={<AllPost />} />
            ) : (
              <Route
                path="/AllPost"
                element={<Navigate to="/Login" replace />}
              />
            )}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/CreatePost" element={<CreatePost />} />
            <Route exact path="/AllPost" element={<AllPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
