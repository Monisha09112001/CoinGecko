import { useEffect, useState } from "react";
import { CoinsListService } from "../Services/ApiServices";
import { CoinListProps } from "../Types/General"; // Assuming `Coin` type is defined in General.ts
import RenderItem from "../Components/RenderItem/RenderItem";
import { useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";
import { ErrorMsg, Toast } from "../Shared/Toast";

export default function CoinsList() {
  const [coinList, setCoinList] = useState<CoinListProps>({
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCoinsList();
  }, []);

  const getCoinsList = async (size: number = 10) => {
    setLoading(true);
    const finalOBJ = {
      vs_currency: "EUR",
      order: "market_cap_desc",
      per_page: size,
    };

    try {
      const response = await CoinsListService(finalOBJ);
      const data: any[] = await response.json();

      const sortedCoins = data?.sort(
        (a, b) => (b.market_cap ?? 0) - (a.market_cap ?? 0) // Added nullish coalescing for safety
      );

      setCoinList({
        data: sortedCoins.map((ele) => ({ ...ele, status: false })),
      });
    } catch (error) {
      Toast.fail(ErrorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="heading">Cryptocurrency</h2>

      {loading ? (
        <Loader />
      ) : (
        <RenderItem
          handleClickitem={(id: string) => {
            navigate("coinviewpage", { state: { itemid: id } });
          }}
          handleRetryListApi={() => getCoinsList()}
          UpdateDataList={(dataList: any[]) => {
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
      )}
    </>
  );
}
