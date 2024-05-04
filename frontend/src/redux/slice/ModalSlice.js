import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  formType: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.formType = action.payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      // state.formType = null;
      state.isOpen = false;
    },
    changeFormType: (state, action) => {
      state.formType = action.payload;
    },
  },
});

export const { openModal, closeModal, changeFormType} =
  modalSlice.actions;

export default modalSlice.reducer;
