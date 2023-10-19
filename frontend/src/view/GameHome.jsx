import styles from "./GameHome.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.gif";

export default function GameHome() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    switch (event.target.id) {
      case "username":
        setLogin({ ...login, username: event.target.value });
        break;

      case "password":
        setLogin({ ...login, password: event.target.value });
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.container}>
        <img src={logo} alt="logo" className={styles.logo} />

        <form onSubmit={onSubmit} className={styles.form}>
          <div>
            <label htmlFor="username" className={styles.label}>
              USERNAME:{" "}
            </label>
            <input
              id="username"
              type="text"
              onChange={handleChange}
              value={login.username}
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="PASSWORD" className={styles.label}>
              PASSWORD:{" "}
            </label>
            <input
              id="password"
              type="password"
              onChange={handleChange}
              value={login.password}
              className={styles.input}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className={styles.button}
              onClick={() => navigate("/dashboard")}
            ></input>
          </div>
          <p className={styles.register}>Register an Account</p>
        </form>
      </div>
    </div>
  );
}
