import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type HomeState = {
  id: number;
};

const initialState: HomeState = {
  id: 0,
};

export const loadHomeData = createAsyncThunk(
  "baseWidget/fetchData",
  async (request: any) => {
    return {
      id: 1,
    };
  }
);

export const baseWidgetSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadHomeData.pending, (state) => {
        state.id = 0;
      })
      .addCase(loadHomeData.fulfilled, (state, action: PayloadAction<any>) => {
        state.id = action.payload.id;
      })
      .addCase(loadHomeData.rejected, (state) => {
        state.id = 0;
      })
      .addDefaultCase(() => {});
  },
});

export const selectBaseWidgetData = (state: RootState) => state.baseWidget;

export default baseWidgetSlice.reducer;
