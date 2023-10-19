import styles from "./GameSelection.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Context
import { useContext } from "react";
import { PlayerContext } from "../components/PlayerContextProvider";

export default function GameSelection() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [player, setPlayer] = useContext(PlayerContext);
  const [categorySelected, setCategorySelected] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
    const newURL = `http://localhost:8888/play?category=${event.target.value}`;
    setPlayer({ ...player, url: newURL, category: event.target.value });
  };

  const handleStart = (event) => {
    event.preventDefault();

    if (category == "") {
      setCategorySelected(true);
    } else {
      navigate("/gamestart");
    }
  };

  return (
    <div className="backgroundBoard">
      <div className={styles.backgroundImage}>
        <div className="logo-container">
          <img src="../src/assets/logo.gif" alt="logo" className="logo" />
        </div>
        <form onSubmit={handleStart} className={styles.formGameSelection}>
          <h1>Brain's ready? Let's roll</h1>
          <p className={styles.warning}>
            You've got one shot; a wrong answer means game over.
          </p>
          <label htmlFor="selectCategory">SELECT CATEGORY</label>
          <select
            id="selectCategory"
            className={styles.input}
            onChange={handleChange}
          >
            <option selected disabled>
              Please select
            </option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="math">Math</option>
            <option value="entertainment">Entertainment</option>
          </select>
          {categorySelected === true ? (
            <p className={styles.selectCategoryWarning}>
              Please select category
            </p>
          ) : null}
          <button type="submit" className={styles.button} onClick={handleStart}>
            START!
          </button>

          <button
            type="submit"
            className={styles.backButton}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            BACK
          </button>
        </form>
      </div>
    </div>
  );
}
