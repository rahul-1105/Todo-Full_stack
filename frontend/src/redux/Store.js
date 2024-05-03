import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/ModalSlice"

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
