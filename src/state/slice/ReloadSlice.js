import { createSlice } from "@reduxjs/toolkit";

//Context de react para la recarga de las tablas en tiempo real
//Se inicializa en false
const initialStateReload = {
  reload: false,
};

//Se crea el reducer y se le establecen los metodos necesarios
export const reloadSlice = createSlice({
  name: "reload",
  initialState: initialStateReload,
  reducers: {
    activeReload: (state) => {
      state.reload = true;
    },

    deactiveReload: (state) => {
      state.reload = false;
    },
  },
});

export const { activeReload, deactiveReload } = reloadSlice.actions;
export default reloadSlice.reducer;
