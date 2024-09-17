import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  fetchWater,
  getMonthInfo,
  updateWater,
} from "./operations";
import { getISOStringDate } from "../../shared/helpers/getISOStringDate";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterInfo: {
      total: 900,
      dailyRecords: [],
    },
    monthlyRecords: [],
    activeDay: getISOStringDate(),
    currentDay: new Date().toISOString().split("T")[0],
    currentMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.waterInfo.total += payload.amount;
        state.loading = false;
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWater.fulfilled, (state, { payload }) => {
        state.waterInfo.total = payload.total;
        state.loading = false;
      })
      .addCase(fetchWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waterInfo.dailyRecords.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.waterInfo.dailyRecords[index] = action.payload.data;
        }
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        const waterId = action.meta.arg;
        state.waterInfo.dailyRecords = state.waterInfo.dailyRecords.filter(
          (item) => item._id !== waterId
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMonthInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMonthInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.mounthWater = action.payload;
      })
      .addCase(getMonthInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const waterReducer = waterSlice.reducer;
export const { setActiveDay } = waterSlice.actions;
