import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./operations";

const initialState = {
  user: {
    email: null,
    password: null,
    dailyNorma: 1500,
  },
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.user.dailyNorma = payload.dailyWater || 1500;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const authReducer = authSlice.reducer;
