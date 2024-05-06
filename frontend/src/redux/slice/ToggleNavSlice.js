import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleNav: "nav-close",
};

export const toggleNavSlice = createSlice({
  name: "toggleNav",
  initialState,
  reducers: {
    openNav: (state) => {
      state.toggleNav = "show-nav";
    },
    closeNav: (state) => {
      state.toggleNav = "nav-close";
    },
  },
});

export const { openNav, closeNav } = toggleNavSlice.actions;

export default toggleNavSlice.reducer;
