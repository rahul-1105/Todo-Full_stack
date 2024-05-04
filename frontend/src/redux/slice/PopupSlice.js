import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  isOpen: false,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true;
      state.id = action.payload || null;
    },
    closePopup: (state) => {
      state.id = null;
      state.isOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
