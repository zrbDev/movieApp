import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice.ts";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState tipi, store'un durum tipini alır.
export type AppDispatch = typeof store.dispatch;

export default store;
