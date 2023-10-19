import styles from "./Dashboard.module.css";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import logout from "../assets/logout.png";

//Components
import LeaderBoard from "../components/LeaderBoard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwtToken);
    const decodedUsername = decodedToken.username;
    const capitalizedUsername =
      decodedUsername.charAt(0).toUpperCase() + decodedUsername.slice(1);
    setUsername(capitalizedUsername);
  }, []);

  const logoutButton = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={styles.backgroundImage}>
      <header className={styles.nav}>
        <div>
          <img src={logo} className={styles.logo} />
        </div>

        <div className={styles.headersAction}>
          <img
            src={logout}
            alt="logout button"
            className={styles.logoutButton}
            onClick={logoutButton}
          />

          <div
            onClick={() => navigate("/userProfile")}
            className={styles.userprofile}
          >
            User Profile
          </div>
        </div>
      </header>

      <p className={styles.welcome}>
        It's trivia time! Show off your smarts, {username}!
      </p>

      <div>
        <LeaderBoard />
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/gameselection");
          }}
        >
          PLAY
        </button>
      </div>
    </div>
  );
}
