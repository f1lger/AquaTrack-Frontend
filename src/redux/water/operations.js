import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../API/axiosInstance";

export const addWater = createAsyncThunk(
  "water/addWater",
  async ({ amount, time }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/water", { amount, time });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWater = createAsyncThunk(
  "water/fetchWater",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/water");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/updateWater",
  async ({ waterId, ...water }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${waterId}`, water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${waterId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMonthInfo = createAsyncThunk(
  "water/getMonthInfo",
  async (date, thunkAPI) => {
    try {
      const { data } = await instance.get(`api/water/month/${date}`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
