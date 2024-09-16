import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, registerUser } from "./operations";

const initialState = {
  user: {
    email: null,
    dailyNorma: 1500,
  },
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
<<<<<<< register-pg
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, handleFulfilled)
      .addCase(fetchUser.rejected, handleError)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleError);
=======
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
>>>>>>> main
  },
});

export const authReducer = authSlice.reducer;
