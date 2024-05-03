import axios from "axios";

export const apiService = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchFloodHeightRequest = async (
  latitude: number,
  longitude: number
) => {
  //post request to the server with lat and lon
  const response = await apiService.post("/height/", {
    lat: latitude,
    lon: longitude,
  });
  return response.data;
};

export const fetchFloodDamageRequest = async (
  latitude: number,
  longitude: number,
  buildingAge: number,
  estimatedValue: number,
  buildingHeight: number,
  floors: number,
  walls: string,
  roof: string,
  pillars: string
) => {
  const response = await apiService.post("/predict_loc/", {
    "Building Age": buildingAge,
    "Estimated value": estimatedValue,
    Floors: floors,
    "Building Height": buildingHeight,
    Walls: walls,
    Roof: roof,
    Pillars: pillars,
    lat: latitude,
    lon: longitude,
  });
  return response.data;
};

export const fetchTiffDataRequest = async () => {
  const response = await apiService.get("/");
  return response.data;
};
