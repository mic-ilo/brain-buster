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

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <tr>
                <th>USERNAME</th>

                <th>SCORE</th>

                <th>COUNTRY</th>
              </tr>

              <tr>
                <td>Nala</td>

                <td>85</td>

                <td>Philippines</td>
              </tr>

              <tr>
                <td>Appa</td>

                <td>83</td>

                <td>Philippines</td>
              </tr>
            </table>
          </div>

          <p className={styles.notice}>--This feature is not yet available--</p>
        </div>
      </div>
    </div>
  );
}
