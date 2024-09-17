import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersCount, getUserInfo, patchUserInfo } from "./operations";
// import { logOut } from "../auth/operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const usersInitialState = {
  user: {},
  usersCount: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,

  extraReducers: (builder) => {
    builder
      //getUserInfo
      .addCase(getUserInfo.pending, handlePending)
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserInfo.rejected, handleRejected)
      //getAllUsersCount
      .addCase(getAllUsersCount.pending, handlePending)
      .addCase(getAllUsersCount.fulfilled, (state, action) => {
        state.usersCount = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsersCount.rejected, handleRejected)
      //patchUserInfo
      .addCase(patchUserInfo.pending, handlePending)
      .addCase(patchUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.loading = false;
      })
      .addCase(patchUserInfo.rejected, handleRejected);
    //clear redux after logout
    //   .addCase(logOut.fulfilled, () => usersInitialState);
  },
});

export const usersReducer = usersSlice.reducer;
