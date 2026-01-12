import { createSlice } from "@reduxjs/toolkit";

const initialStateReload = {
  reload: false,
};

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
