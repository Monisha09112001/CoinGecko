import PageNotFound from "../Components/PageNotFound";
import CoinsList from "../Screens/CoinsList";
import CoinViewPage from "../Screens/CoinViewPage";
import IndexScreen from "../Screens/IndexScreen";

export const IndexRoute = [
  {
    element: <IndexScreen />,
    children: [
      { path: "/", element: <CoinsList />, index: true },
      {
        path: "coinviewpage",
        element: <CoinViewPage />,
      },
    ],
    errorElement: <PageNotFound />,
  },
];
