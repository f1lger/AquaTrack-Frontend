import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../API/axiosInstance";
import toastMaker from "../../shared/helpers/toastMaker/toastMaker.jsx";

const setAuthHeader = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  instance.defaults.headers.common["Authorization"] = "";
};

export const login = createAsyncThunk(
  "user/login",
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await instance.post("/api/users/login", userInfo);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };

      if (response.statusCode === 401) {
        if (response.message === "Please verify your email") {
          toastMaker("Please verify your email", "error");
        } else {
          toastMaker("Email or password is wrong", "error");
        }
      } else {
        toastMaker("Login failed", "error");
      }
      return thunkAPI.rejectWithValue(response);
    }
  }
);
