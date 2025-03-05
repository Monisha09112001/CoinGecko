import { BASE_URL } from "./ServiceConstant";

export const CoinsListService = (params: Record<string, string | number>) => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return fetch(`${BASE_URL}coins/markets?${queryString}`, {
    method: "GET",
  });
};
