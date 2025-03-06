import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <Spinner animation="border" role="status" />
    </div>
  );
}
