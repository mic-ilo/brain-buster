import styles from "./GameHomeLogin.module.css";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";

export default function GameHomeLogin(props) {
  const { handleChange, onSubmit, username, password, loginError, emptyData } =
    props;

  const navigate = useNavigate();
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
              value={username}
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              PASSWORD:
            </label>
            <input
              id="password"
              type="password"
              onChange={handleChange}
              value={password}
              className={styles.input}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Login"
              className={styles.button}
            ></input>
          </div>
          {emptyData ? <p>Please input username/ password</p> : null}
          {loginError ? (
            <p className={styles.loginError}>
              Username and password does not match or account does not exist
            </p>
          ) : null}
          <p className={styles.register} onClick={() => navigate("/register")}>
            Register an Account
          </p>
        </form>
      </div>
    </div>
  );
}
