import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import styles from "./RenderItem.module.css"; // Import CSS module
import { Icons } from "../Utilities/Icons";
import NoDataFound from "./NodataFound";

type RenderItemProps = {
  handleRetryListApi: () => void;
  datalist: any[];
  keys: string[];
  LabelName: Record<string, string>;
  handleClickitem: (id: string) => void;
  UpdateDataList: (dataList: any) => void;
};

export default function RenderItem({
  handleRetryListApi,
  datalist,
  keys,
  LabelName,
  handleClickitem,
  UpdateDataList,
}: RenderItemProps) {
  const [items, setItems] = useState<any[]>([]);
  const [showConfetti, setShowConfetti] = useState({ status: false, id: "" });

  // Update state when datalist changes
  useEffect(() => {
    if (datalist && datalist.length > 0) {
      setItems(datalist);
    }
  }, [datalist]);

  // Handle marking as favorite with confetti effect
  const markAsFavorite = (event: React.MouseEvent, item: any) => {
    event.stopPropagation(); // Prevent triggering the parent onClick

    const UpdatedList = datalist?.map((ele: any) =>
      ele?.id === item?.id ? { ...ele, status: !ele?.status } : ele
    );
    UpdateDataList(UpdatedList);

    if (!item?.status) {
      setShowConfetti({ status: true, id: item?.id });
      setTimeout(() => setShowConfetti({ status: false, id: "" }), 2000);
    }
  };

  return (
    <>
      <NoDataFound items={datalist} onClick={handleRetryListApi} />

      <Container fluid>
        <h2 className="heading">Cryptocurrency</h2>
        <ul className={`${styles.listContainer} list-unstyled`}>
          <Row className="g-4">
            {items.map((item: any, index: number) => (
              <Col xs={12} sm={6} md={4} lg={3} xl={2} key={String(item.id)}>
                <li className={styles.listItem}>
                  <button
                    aria-label="click the card"
                    className={`${styles.itemBox} ${styles.fadeIn}`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={() => handleClickitem(item?.id)}
                  >
                    {keys.map((key) => (
                      <div key={key} className={styles.itemDetail}>
                        {key === "image" ? (
                          <div className={styles.imageContainer}>
                            <img
                              src={item[key]}
                              alt={LabelName[key]}
                              className={styles.image}
                            />
                          </div>
                        ) : (
                          <>
                            {key === "name" ? (
                              <h4 style={{ color: "darkcyan" }}>{item[key]}</h4>
                            ) : (
                              <p className={styles.text}>
                                <strong>{LabelName[key]}:</strong> {item[key]}
                              </p>
                            )}
                          </>
                        )}
                        {item?.id === showConfetti?.id && (
                          <div className={styles.favoriteIcon}>
                            <ConfettiExplosion
                              force={0.4}
                              duration={2200}
                              particleCount={10}
                              width={300}
                              height={300}
                              style={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Favorite Icon */}
                    <button
                      aria-label={`mark ${
                        item?.status ? "unfavorite" : "favorite"
                      }`}
                      className={styles.favoriteIcon}
                      onClick={(event) => markAsFavorite(event, item)}
                    >
                      <img
                        src={item?.status ? Icons.HertSolid : Icons.HertRegular}
                        alt={item?.status ? "HertSolid" : "HertRegular"}
                        className={styles.heart_icon}
                      />
                    </button>
                  </button>
                </li>
              </Col>
            ))}
          </Row>
        </ul>
      </Container>
    </>
  );
}
