import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type RiskLevel = "Low" | "Medium" | "High" | null;

export type HomeState = {
  mode: "light" | "dark";
  processPending: boolean;
  percentagePending: boolean;
  riskLevel: RiskLevel;
  riskPercentage: number;
  error: string | null;
};

const initialState: HomeState = {
  mode: "light",
  processPending: false,
  percentagePending: true,
  riskLevel: null,
  riskPercentage: 0,
  error: null,
};

export const changeTheme = createAsyncThunk(
  "home/theme",
  async (request: { mode: "light" | "dark" }) => {
    return {
      mode: request.mode,
    };
  }
);

export const fetchData = createAsyncThunk(
  "home/fetchData",
  async (request: {
    latitude: number;
    longitude: number;
  }): Promise<{
    riskLevel: RiskLevel;
    riskPercentage: number;
  }> => {
    console.log("fetchData", request);
    //fetch data from API and calculate risk level and percentage here
    return new Promise((resolve) => {
      resolve({
        riskLevel: "Medium", // Hardcoded for now
        riskPercentage: 60, // Hardcoded for now
      });
    });
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
      .addCase(fetchData.pending, (state) => {
        state.processPending = true;
      })
      .addCase(
        fetchData.fulfilled,
        (
          state,
          action: PayloadAction<{
            riskLevel: RiskLevel;
            riskPercentage: number;
          }>
        ) => {
          state.processPending = false;
          state.percentagePending = false;
          state.riskLevel = action.payload.riskLevel;
          state.riskPercentage = action.payload.riskPercentage;
        }
      )
      .addCase(fetchData.rejected, (state) => {
        state.processPending = false;
        state.error = "Error fetching data";
      })
      .addDefaultCase(() => {});
  },
});

export const selectBaseWidgetData = (state: RootState) => state.home;

export default homeSlice.reducer;
