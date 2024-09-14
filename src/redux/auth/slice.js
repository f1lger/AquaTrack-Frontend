import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: null,
    password: null,
  },
  token: null,
  isLoading: null,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
export default authSlice.reducer
