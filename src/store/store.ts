import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../features/home/home.slice";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import okamiServer from "../services/okami";

const Store = configureStore({
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okamiServer.middleware),
  reducer: {
    [homeSlice.name]: homeSlice.reducer,
    [okamiServer.reducerPath]: okamiServer.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
