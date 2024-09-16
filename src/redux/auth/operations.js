import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://aquatrack-back-end.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
// const clearAuthHeader = () => {
//   axios.defaults.headers.common["Authorization"] = "";
// };

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("users/register", userInfo);
      console.log("response data", response.data);
      setAuthHeader(response.data.token);

      return response.data;
    } catch (err) {
      console.error("Register error:", err);
      console.error("Register error status:", err.response?.status);
      console.error("Register error message:", err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users/current");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
