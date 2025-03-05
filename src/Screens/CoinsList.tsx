import { useEffect, useState } from "react";
import { CoinsListService } from "../Services/ApiServices";
import { CoinListProps } from "../Types/General";

export default function CoinsList() {
  const [coinList, setCoinList] = useState<CoinListProps>({
    data: [],
  });
  useEffect(() => {
    getCoinsList();
  }, []);

  const getCoinsList = () => {
    let finalOBJ = {
      vs_currency: "EUR",
      order: "market_cap_desc",
      per_page: 10,
    };

    CoinsListService(finalOBJ)
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => {
        console.log(data, "res");
        setCoinList({ data: data });
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        console.log("completed");
      });
  };

  console.log(coinList, "coinList");

  return (
    <>
      <section>
        <div>
          <p>dhsj</p>
        </div>
      </section>
    </>
  );
}
