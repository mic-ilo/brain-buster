import styles from "./UserProfile.module.css";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserProfile(props) {
  const [deleteAccount, setDeleteAccount] = useState(false);
  const navigate = useNavigate();
  const {
    deleteAccountAction,
    updateUsername,
    updatePassword,
    handleChange,
    usernameValue,
    passwordValue,
    usernameChangeSuccess,
    passwordChangeSuccess,
    usernameTaken,
  } = props;

  return (
    <div className={styles.backgroundImage}>
      UserProfile
      <header className={styles.nav}>
        <div>
          <img src={logo} className={styles.logo} />
        </div>
        <div
          onClick={() => navigate("/userProfile")}
          className={styles.userprofile}
        >
          User Profile
        </div>
      </header>
      <div className={styles.userContainer}>
        <div className={styles.userSubContainer}>
          <h1 className={styles.title}>Update User Profile: </h1>
          <div>
            <label htmlFor="username" className={styles.label}>
              Update Username:
            </label>
            <input
              id="username"
              className={styles.input}
              onChange={handleChange}
              value={usernameValue}
            />
            <button className={styles.updateButton} onClick={updateUsername}>
              update
            </button>
            {usernameChangeSuccess ? (
              <p className={styles.changeSuccess}>
                You have successfully updated your username
              </p>
            ) : null}
            {usernameTaken ? (
              <p className={styles.usernameTaken}>Username already taken</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Update password:
            </label>
            <input
              id="password"
              className={styles.input}
              onChange={handleChange}
              value={passwordValue}
            />
            <button className={styles.updateButton} onClick={updatePassword}>
              update
            </button>
            {passwordChangeSuccess ? (
              <p className={styles.changeSuccess}>
                You have successfully updated your password
              </p>
            ) : null}
          </div>

          <div className={styles.buttonsContainer}>
            <button
              className={styles.backButton}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Back
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setDeleteAccount(true);
              }}
            >
              Delete Account
            </button>
          </div>

          {deleteAccount ? (
            <div className={styles.confirmDelete}>
              <div className={styles.warningMessage}>
                <p>
                  CLick YES to confirm deletion of your account. You can no
                  longer retrieve once deleted.
                </p>

                <button
                  className={`${styles.confirmButton} ${styles.yes}`}
                  onClick={deleteAccountAction}
                >
                  Yes
                </button>
                <button
                  className={`${styles.confirmButton} ${styles.no}`}
                  onClick={() => {
                    setDeleteAccount(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
