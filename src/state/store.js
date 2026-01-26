import { configureStore } from "@reduxjs/toolkit";
import reloadSlice from "./slice/ReloadSlice";

//Se exporta el reducer entero, aqui es como una clase que almacena todos los reducers existentes
export const store = configureStore({
  reducer: {
    reload: reloadSlice,
  },
});
