import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: null,
  isError: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {},
});

export default waterSlice.reducer;