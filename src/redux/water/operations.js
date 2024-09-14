import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
