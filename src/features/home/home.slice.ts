import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../../store/store";

interface HomeState {
  search: string;
}

const defaultState: HomeState = {
  search: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState: defaultState,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
  },
});

export const { actions: homeActions } = homeSlice;

export const selectSearch = (state: RootState): string => state.home.search;

export default homeSlice;
