import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";

export default function Loader({ loading }: { loading: boolean }) {
  return loading ? (
    <div className={styles.loaderContainer}>
      <Spinner animation="border" role="status" />
    </div>
  ) : null;
}
