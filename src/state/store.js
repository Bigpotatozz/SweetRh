import { configureStore } from "@reduxjs/toolkit";
import reloadSlice from "./slice/ReloadSlice";

export const store = configureStore({
  reducer: {
    reload: reloadSlice,
  },
});
