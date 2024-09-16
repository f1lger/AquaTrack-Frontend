import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, register } from "./operations";

const initialState = {
  user: {
    email: null,
    dailyNorma: 1500,
  },
  isLogedIn: false,
  token: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, { payload }) => {
  state.user.email = payload.email;
  state.user.dailyNorma = payload.dailyNorma || 1500;
  state.token = payload.token;
  state.loading = false;
};

const handleError = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, handleFulfilled)
      .addCase(fetchUser.rejected, handleError)
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(register.rejected, handleError);
  },
});

export const authReducer = authSlice.reducer;
