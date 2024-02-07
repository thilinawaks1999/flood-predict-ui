import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type HomeState = {
  mode: "light" | "dark";
};

const initialState: HomeState = {
  mode: "light",
};

export const changeTheme = createAsyncThunk(
  "home/theme",
  async (request: { mode: "light" | "dark" }) => {
    return {
      mode: request.mode,
    };
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
      .addDefaultCase(() => {});
  },
});

export const selectBaseWidgetData = (state: RootState) => state.home;

export default homeSlice.reducer;
