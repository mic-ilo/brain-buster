import styles from "./Dashboard.module.css";
import logo from "../assets/logo.gif";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../components/PlayerContextProvider";

//Components
import LeaderBoard from "../components/LeaderBoard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [player] = useContext(PlayerContext);

  return (
    <div className={styles.backgroundImage}>
      <header className={styles.nav}>
        <div>
          <img src={logo} className={styles.logo} />
        </div>
        <p className={styles.welcome}>
          Welcome back,{" "}
          <span className={styles.username}>{player.username}</span> `
        </p>
        <div
          onClick={() => navigate("/userProfile")}
          className={styles.userprofile}
        >
          User Profile
        </div>
      </header>
      <div>
        I<LeaderBoard />
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
