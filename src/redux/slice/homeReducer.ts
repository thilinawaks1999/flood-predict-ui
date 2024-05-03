import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  fetchFloodDamageRequest,
  fetchFloodHeightRequest,
  fetchTiffDataRequest,
} from "../../services/apiService";

export type RiskLevel = "Low" | "Medium" | "High" | null;

export type HomeState = {
  mode: "light" | "dark";
  tiffData: number[][] | null;
  tiffDataPending: boolean;
  tiffDataError: string | null;
  floodHeight: number | null;
  floodHeightPending: boolean;
  floodHeightError: string | null;
  floodDamage: string | null;
  floodDamagePending: boolean;
  floodDamageError: string | null;
  currentComponent: "height" | "damage";
};

const initialState: HomeState = {
  mode: "light",
  tiffData: null,
  tiffDataPending: false,
  tiffDataError: null,
  floodHeight: null,
  floodHeightPending: false,
  floodHeightError: null,
  floodDamage: null,
  floodDamagePending: false,
  floodDamageError: null,
  currentComponent: "height",
};

export const changeTheme = createAsyncThunk(
  "home/theme",
  async (request: { mode: "light" | "dark" }) => {
    return {
      mode: request.mode,
    };
  }
);

export const changeComponent = createAsyncThunk(
  "home/changeComponent",
  async (request: { component: "height" | "damage" }) => {
    return {
      currentComponent: request.component,
    };
  }
);

export const fetchFloodHeight = createAsyncThunk(
  "home/fetchFloodHeight",
  async (request: { latitude: number; longitude: number }): Promise<number> => {
    const data = await fetchFloodHeightRequest(
      request.latitude,
      request.longitude
    );

    return data.flood_height;
  }
);

export const fetchFloodDamage = createAsyncThunk(
  "home/fetchFloodDamage",
  async (request: {
    latitude: number;
    longitude: number;
    buildingAge: number;
    estimatedValue: number;
    buildingHeight: number;
    floors: number;
    walls: string;
    roof: string;
    pillars: string;
  }): Promise<string> => {
    const data = await fetchFloodDamageRequest(
      request.latitude,
      request.longitude,
      request.buildingAge,
      request.estimatedValue,
      request.buildingHeight,
      request.floors,
      request.walls,
      request.roof,
      request.pillars
    );

    return data.predicted_class;
  }
);

export const fetchTiffData = createAsyncThunk(
  "home/fetchTiffData",
  async (): Promise<number[][]> => {
    const data = await fetchTiffDataRequest();
    return data.image;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeTheme.fulfilled, (state, action: PayloadAction<any>) => {
        state.mode = action.payload.mode;
      })
      .addCase(changeTheme.rejected, (state) => {
        state.mode = "light";
      })
      .addCase(
        changeComponent.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.currentComponent = action.payload.currentComponent;
        }
      )
      .addCase(changeComponent.rejected, (state) => {
        state.currentComponent = "height";
      })
      .addCase(fetchFloodHeight.pending, (state) => {
        state.floodHeightPending = true;
        state.floodHeightError = null;
      })
      .addCase(
        fetchFloodHeight.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.floodHeight = action.payload;
          state.floodHeightPending = false;
        }
      )
      .addCase(fetchFloodHeight.rejected, (state) => {
        state.floodHeightPending = false;
        state.floodHeightError = "Error fetching flood height";
      })
      .addCase(fetchFloodDamage.pending, (state) => {
        state.floodDamagePending = true;
        state.floodDamageError = null;
      })
      .addCase(
        fetchFloodDamage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.floodDamage = action.payload;
          state.floodDamagePending = false;
        }
      )
      .addCase(fetchFloodDamage.rejected, (state) => {
        state.floodDamagePending = false;
        state.floodDamageError = "Error fetching flood damage";
      })
      .addCase(fetchTiffData.pending, (state) => {
        state.tiffDataPending = true;
        state.tiffDataError = null;
      })
      .addCase(
        fetchTiffData.fulfilled,
        (state, action: PayloadAction<number[][]>) => {
          state.tiffData = action.payload;
          state.tiffDataPending = false;
        }
      )
      .addCase(fetchTiffData.rejected, (state) => {
        state.tiffDataPending = false;
        state.tiffDataError = "Error fetching tiff data";
      })
      .addDefaultCase(() => {});
  },
});

export const selectBaseWidgetData = (state: RootState) => state.home;

export default homeSlice.reducer;
