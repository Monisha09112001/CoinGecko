import { useEffect, useState } from "react";
import { CoinsListService } from "../Services/ApiServices";
import { CoinListProps } from "../Types/General";
import RenderItem from "../Components/RenderItem";
import { useNavigate } from "react-router";
import Loader from "../Components/Loader";
import { ErrorMsg, Toast } from "../Utilities/Toast";

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
          (a: any, b: any) => b.market_cap - a.market_cap
        );
        setCoinList({
          data: SortedCoins?.map((ele: any) => {
            return { ...ele, status: false };
          }),
        });
      })
      .catch((err) => {
        Toast.fail(ErrorMsg);
      })
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
        handleRetryListApi={() => getCoinsList()}
        UpdateDataList={(dataList: any) => {
          setCoinList({ data: dataList });
        }}
        datalist={coinList.data}
        keys={[
          "image",
          "name",
          "symbol",
          "current_price",
          "high_24h",
          "low_24h",
        ]}
        LabelName={{
          image: "Image",
          name: "Name",
          symbol: "Symbol",
          current_price: "Current Price",
          high_24h: "High 24-hour Price",
          low_24h: "Low 24-hour Price",
        }}
      />
    </>
  );
}
