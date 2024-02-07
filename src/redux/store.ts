import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import homeReducer, { HomeState } from "./slice/homeReducer";

export function configStore() {
  return configureStore({
    reducer: {
      home: homeReducer,
    },
  });
}

export type AppDispatch = ThunkDispatch<
  {
    home: HomeState;
  },
  undefined,
  AnyAction
>;

export type RootState = {
  home: HomeState;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configStore();
