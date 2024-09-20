import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://aquatrack-back-end.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const register = createAsyncThunk(
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
      const response = await axios.get("/users/info");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestSignIn = async (formData) => {
  const { data } = await axios.post("/users/login", formData);
  setAuthHeader(data.token);
  return data;
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const data = await requestSignIn(formData);
      return data;
    } catch (err) {
      toast.error("Please sign up");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);



export const updateUser = createAsyncThunk(
  "auth/update",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.patch("/users/profile", formData, { 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
); 

/*
export const updateUser = createAsyncThunk(
  "auth/update",
  async (formData, thunkAPI) => {
    try {
      console.log("Update user function called");
      const token = thunkAPI.getState().auth.token;

      console.log("Token:", token);

      if (!token) {
        throw new Error("No authorization token available");
      }

      console.log('Token is valid, setting auth header...');
      setAuthHeader(token);

      const res = await axios.patch("/users/profile", formData, { 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Response from server:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating user:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
); */
