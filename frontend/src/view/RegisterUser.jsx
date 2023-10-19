import styles from "./RegisterUser.module.css";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";

export default function RegisterUser(props) {
  const navigate = useNavigate();
  const {
    username,
    handleChange,
    password,
    handleSubmit,
    confirmPassword,
    passwordError,
    isRegistered,
    isSuccessful,
  } = props;

  return (
    <div className={styles.backgroundImage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Register an Account</h1>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.item}>
          <label htmlFor="username" className={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item}>
          <label htmlFor="password" className={styles.label}>
            Password:{" "}
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.item}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            onChange={handleChange}
            value={confirmPassword}
          />
        </div>
        {isSuccessful ? (
          <p className={styles.successfulRegister}>
            You havee successfully created an account. Return to{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        ) : null}
        {passwordError ? <p>passwords do not match</p> : null}
        {isRegistered ? <p>username already exists</p> : null}
        <input type="submit" value="Submit" className={styles.button} />
      </form>
    </div>
  );
}
