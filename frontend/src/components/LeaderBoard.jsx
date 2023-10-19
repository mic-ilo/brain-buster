import styles from "./LeaderBoard.module.css";
export default function LeaderBoard() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <header className={styles.header}>Leader board</header>
        <div className={styles.selectContainer}>
          <label htmlFor="selectCategory">Select Category: </label>
          <select id="selectCategory" className={styles.selectCategory}>
            <option value="science">Science</option>
            <option value="math">Math</option>
            <option value="history">History</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>
    </div>
  );
}
