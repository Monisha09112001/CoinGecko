import { Container, Row, Col } from "react-bootstrap";
import styles from "./RenderItem.module.css"; // Import CSS module

type RenderItemProps = {
  callNextPage: (size: number) => void;
  datalist: any[];
  keys: string[];
  keyName: Record<string, string>;
  handleClickitem: (id: string) => void;
};

export default function RenderItem({
  callNextPage,
  datalist,
  keys,
  keyName,
  handleClickitem,
}: RenderItemProps) {
  return (
    <Container fluid className="p-3">
      <Row className="g-4">
        {datalist?.map((item: any, index: number) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            {/* Apply fade-in animation with delay */}
            <div
              className={`${styles.itemBox} ${styles.fadeIn}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleClickitem(item?.id)}
            >
              {keys.map((key) => (
                <div key={key} className={styles.itemDetail}>
                  {key === "image" ? (
                    <div className={styles.imageContainer}>
                      <img
                        src={item[key]}
                        alt={keyName[key]}
                        className={styles.image}
                      />
                    </div>
                  ) : (
                    <p className={styles.text}>
                      <strong>{keyName[key]}:</strong> {item[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
