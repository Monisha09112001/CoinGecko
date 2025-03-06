import { useLocation } from "react-router";
import { ViewCoinsService } from "../Services/ApiServices";
import { useEffect, useState } from "react";
import styles from "./CoinViewPage.module.css"; // Import styles
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../Components/Loader";
import { motion } from "framer-motion"; // Import Framer Motion
import { ErrorMsg, Toast } from "../Utilities/Toast";

export default function CoinViewPage() {
  const { state } = useLocation();
  const { itemid } = state || {};
  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoinItem();
  }, []);

  const getCoinItem = () => {
    ViewCoinsService(itemid)
      .then((res) => res.json())
      .then((data) => {
        setCoinData(data);
      })
      .catch((err) => {
        Toast.fail(ErrorMsg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Loader loading={loading} />
      <motion.div
        initial={{ x: "100%", opacity: 0 }} // Start off-screen (right)
        animate={{ x: 0, opacity: 1 }} // Slide in smoothly
        exit={{ x: "-100%", opacity: 0 }} // Slide out to left when navigating away
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
      >
        <Container className={styles.fadeIn}>
          <h2 className="heading">
            {coinData?.name} ({coinData?.symbol?.toUpperCase()})
          </h2>
          <Row className={styles.detailRow}>
            <Col md={3}>
              <strong>Hashing Algorithm:</strong>
            </Col>
            <Col md={9}>{coinData?.hashing_algorithm || "N/A"}</Col>
          </Row>
          <Row className={styles.detailRow}>
            <Col md={3}>
              <strong>Description:</strong>
            </Col>
            <Col md={9}>{coinData?.description?.en || "N/A"}</Col>
          </Row>
          <Row className={styles.detailRow}>
            <Col md={3}>
              <strong>Genesis Date:</strong>
            </Col>
            <Col md={9}>{coinData?.genesis_date || "N/A"}</Col>
          </Row>
          <Row className={styles.detailRow}>
            <Col md={3}>
              <strong>Homepage URL:</strong>
            </Col>
            <Col md={9}>
              {coinData?.links?.homepage[0] ? (
                <a
                  href={coinData?.links?.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {coinData?.links?.homepage[0]}
                </a>
              ) : (
                "N/A"
              )}
            </Col>
          </Row>
          <h3 className={styles.marketCapTitle}>Market Cap (EUR)</h3>
          <Row className={styles.marketCapContainer}>
            {coinData?.market_data?.market_cap &&
              Object.entries(coinData.market_data.market_cap).map(
                ([currency, value]) => (
                  <Col
                    xs={6}
                    md={4}
                    lg={3}
                    key={currency}
                    className={styles.marketCapItem}
                  >
                    <strong>{currency.toUpperCase()}:</strong>{" "}
                    {value?.toLocaleString()}
                  </Col>
                )
              )}
          </Row>
        </Container>
      </motion.div>
    </>
  );
}
