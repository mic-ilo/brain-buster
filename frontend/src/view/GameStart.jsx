import { useState, useEffect, useContext } from "react";
import styles from "./GameStart.module.css";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../components/PlayerContextProvider";

export default function GameStart() {
  const [questions, setQuestions] = useState(null);
  let [index, setIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [score, setScore] = useState(0);
  const playerName = localStorage.getItem("playerName");
  const [player, setPlayer] = useContext(PlayerContext);
  const [isSelected, setIsSelected] = useState(null);
  const navigate = useNavigate();

  let data;

  // Function to shuffle options using Array.map function
  const shuffle = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(player.url);
        data = await response.json();

        if (data && Array.isArray(data)) {
          setQuestions(data[index]);
          let optionsList = [
            ...data[index].wrongAnswers,
            data[index]?.correctAnswer,
          ];
          setShuffledOptions(shuffle(optionsList));
        } else {
          console.error("Error: Data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [index]);

  const handleOptionClick = (answer, index) => {
    setPlayerAnswer(answer);
    setIsSelected(index);
  };

  if (questions === null) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  const { question } = questions;

  const handleSubmit = () => {
    setIsSelected(null);
    if (playerAnswer === questions.correctAnswer) {
      setIsCorrect(true);
      handleIncrementScore();
    } else {
      setIsWrong(true);
    }
  };

  const handleIncrementScore = () => {
    setScore(score + 1);
    localStorage.setItem("playerScore", score);
  };
  return (
    <div className="backgroundBoard">
      <div className={styles.backgroundImage}>
        <div className={styles.header}>
          <div>
            <p className={styles.playerDetails}>player: {player.username}</p>
            <p className={styles.playerDetails}>score: {score} </p>
          </div>
          <div>
            <img src="../src/assets/logo.gif" alt="logo" className="logo" />
          </div>
        </div>
        <p className={styles.question}>{question}</p>
        {shuffledOptions.map((item, index) => (
          <p
            key={index}
            className={
              index === isSelected
                ? styles.answerOptionSelected
                : styles.answerOption
            }
            onClick={() => handleOptionClick(item, index)}
          >
            {item}
          </p>
        ))}
        <div className={styles.buttonContainer}>
          <button onClick={handleSubmit} className={styles.button}>
            Submit
          </button>

          {isCorrect ? (
            <div className={styles.resultBackground}>
              <div className={styles.result}>
                <div className={styles.boxInfo}>
                  <p className={styles.correctText}>YOU ARE CORRECT!</p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      setIsCorrect(false);
                      setIndex((index += 1));
                      setQuestions(data[(index += 1)]);
                    }}
                  >
                    Proceed to next question
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => navigate("/dashboard")}
                  >
                    Quit game
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {isWrong ? (
            <div className={styles.resultBackground}>
              <div className={styles.result}>
                <div className={styles.boxInfo}>
                  <div className={styles.correctText}>
                    <p>Wrong answer!</p>
                    <p>You can always try again! </p>
                  </div>
                  <button
                    className={styles.button}
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Quit game
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
