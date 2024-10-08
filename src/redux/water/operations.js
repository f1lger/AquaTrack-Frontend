import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthHeader } from "../auth/operations";
export const addWater = createAsyncThunk(
  "water/addWater",
  async ({ amount, date }, thunkAPI) => {
    try {
      const { data } = await axios.post("/water", { amount, date });
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchWater = createAsyncThunk(
  "water/fetchWater",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/updateWater",
  async ({ waterId, ...water }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${waterId}`, water);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${waterId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const waterPerDay = createAsyncThunk(
  "water/waterPerDay",
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setAuthHeader(token);
      const { data } = await axios.get(`/water/per-day/${date}`);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const waterPerMonth = createAsyncThunk(
  "water/waterPerMonth",
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      setAuthHeader(token);
      const { data } = await axios.get(`/water/per-month/${date}`);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
