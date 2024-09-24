import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, login, logout, register, updateUser } from "./operations";

const initialState = {
  user: {
    email: null,
    dailyNorma: 1500,
    avatar: "../../photo/desk/woman-avatar-2x.webp",
    name: null,
    gender: "woman",
    weight: 0,
    sportTime: 0,
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
  state.user.dailyNorma = payload.dailyWater || 1500;
  state.user.name = payload.name;
  state.user.gender = payload.gender;
  state.user.weight = payload.weight;
  state.user.sportTime = payload.sportTime;
  state.user.avatar = payload.avatar;
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
        state.loading = false;
      })
      .addCase(login.rejected, handleError)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.loading = false;
      })
      .addCase(logout.rejected, handleError)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(updateUser.rejected, handleError);
  },
});

export const authReducer = authSlice.reducer;
