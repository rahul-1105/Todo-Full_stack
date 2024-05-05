import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/ModalSlice"
import popupReducer from "./slice/PopupSlice"
import todosReducer from "./slice/TodosSlice"
import authReducer from "./slice/AuthSlice"
import loadingReducer from "./slice/LoadingSlice"


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    popup: popupReducer,
    todos: todosReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});
