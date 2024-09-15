import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://aquatrack-back-end.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("users/signup", userInfo);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/info");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
