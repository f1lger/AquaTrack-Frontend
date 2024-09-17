import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, login, logout, register } from "./operations";

const initialState = {
  user: {
    email: null,
    dailyNorma: 1500,
    name: null,
    gender: "woman",
    weight: 0,
    sportTime: 0,
    avatar: null,
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
  state.user.email = payload.data.email;
  state.user.dailyNorma = payload.data.Water || 1500;
  state.user.name = payload.data.name;
  state.user.gender = payload.data.gender;
  state.user.weight = payload.data.weight;
  state.user.sportTime = payload.data.sportTime;
  state.user.avatar = payload.data.avatar;
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
      .addCase(register.rejected, handleError)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
      })
      .addCase(login.rejected, handleError)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.token = null
      })
      .addCase(logout.rejected, handleError);
  },
});

export const authReducer = authSlice.reducer;
