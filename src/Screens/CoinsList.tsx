import { useEffect, useState } from "react";
import { CoinsListService } from "../Services/ApiServices";
import { CoinListProps } from "../Types/General";
import RenderItem from "../Components/RenderItem";
import { useNavigate } from "react-router";
import Loader from "../Components/Loader";

var isMount = true;
export default function CoinsList() {
  const [coinList, setCoinList] = useState<CoinListProps>({
    data: [],
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoinsList();
  }, [isMount]);

  const getCoinsList = (size = 10) => {
    let finalOBJ = {
      vs_currency: "EUR",
      order: "market_cap_desc",
      per_page: size,
    };

    CoinsListService(finalOBJ)
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => {
        const SortedCoins = data?.sort(
          (a: any, b: any) => a.market_cap - b.market_cap
        );
        setCoinList({ data: SortedCoins });
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Loader loading={loading} />
      <RenderItem
        handleClickitem={(id: string) => {
          navigate("coinviewpage", { state: { itemid: id } });
        }}
        callNextPage={(size: number) => getCoinsList(size)}
        datalist={coinList.data}
        keys={[
          "image",
          "name",
          "symbol",
          "current_price",
          "high_24h",
          "low_24h",
        ]}
        keyName={{
          image: "Image",
          name: "Name",
          symbol: "Symbol",
          current_price: "CurrentPrice",
          high_24h: "High in 24h",
          low_24h: "Low in 24h",
        }}
      />
    </>
  );
}
