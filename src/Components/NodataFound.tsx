import { Icons } from "../Utilities/Icons";
import styles from "./NoDataFound.module.css";

export default function NoDataFound({
  items,
  onClick,
}: {
  items: any;
  onClick: () => void;
}) {
  return !items || items.length === 0 ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.no_data_found_container}>
        <img src={Icons.NoDataFound} alt="NoDataFound" style={{ width: 100 }} />
        <p style={{ margin: 0, color: "gray", fontSize: 20 }}>
          No data available
        </p>
        <button
          aria-label="Refresh coin list"
          className={styles.retry_button}
          onClick={onClick}
        >
          Retry
        </button>
      </div>
    </div>
  ) : null;
}
