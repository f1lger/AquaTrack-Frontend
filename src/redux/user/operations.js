import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosGet, axiosPatch } from "../../service/axios";

export const getUserInfo = createAsyncThunk(
  "users/getUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const persistedToken = state.auth.token;

      const response = await axiosGet(`users/currentUser`, null, {
        Authorization: `Bearer ${persistedToken}`,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchUserInfo = createAsyncThunk(
  "users/patchUser",
  async (userData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const persistedToken = state.auth.token;

      const response = await axiosPatch(`users/currentUser`, userData, {
        Authorization: `Bearer ${persistedToken}`,
        "Content-Type": "multipart/form-data",
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllUsersCount = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosGet(`users`);
      return response.usersAmount.usersAmount;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
