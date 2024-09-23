import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://aquatrack-back-end.onrender.com/";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("users/register", userInfo);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setAuthHeader(token);
      const response = await axios.get("/users/info");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestSignIn = async (formData) => {
  const { data } = await axios.post("/users/login", formData);
  setAuthHeader(data.data.accessToken);
  return data;
};

export const login = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const { data } = await requestSignIn(formData);
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

// Надсилання email для скидання пароля
export const sendPasswordResetEmail = createAsyncThunk(
  "auth/sendPasswordResetEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/send-reset-email", email );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Скидання пароля за токеном
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/users/reset-pwd/${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Log in with Google
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (tokenId, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/google-login', { tokenId });
      if (response.data) {
        return response.data;
      }
      
      return thunkAPI.rejectWithValue("No data returned from server.");
    } catch (error) {
      console.error("Login error:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed.");
    }
  }
);
