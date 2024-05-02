import axios from "axios";

export const apiService = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchFloodHeightRequest = async (
  latitude: number,
  longitude: number
) => {
  const response = await apiService.get(
    `/floodHeight?latitude=${latitude}&longitude=${longitude}`
  );
  return response.data;
};

export const fetchFloodDamageRequest = async (
  latitude: number,
  longitude: number
) => {
  const response = await apiService.get(
    `/floodDamage?latitude=${latitude}&longitude=${longitude}`
  );
  return response.data;
};

export const fetchTiffDataRequest = async () => {
  const response = await apiService.get("/tiffData");
  return response.data;
};
