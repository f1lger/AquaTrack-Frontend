import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  fetchWater,
  updateWater,
  waterPerDay,
  waterPerMonth,
} from "./operations";

const waterPending = (state) => {
  state.loading = true;
  state.error = null;
};
const waterRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterInfo: {
      total: 0,
      dailyRecords: [],
    },
    monthlyRecords: [],
    currentDay: new Date().toISOString().split("T")[0],
    selectedDate: null,
    currentMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, waterPending)
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.waterInfo.total += payload.amount;
        state.loading = false;
      })
      .addCase(addWater.rejected, waterRejected)
      .addCase(waterPerDay.pending, waterPending)
      .addCase(waterPerDay.fulfilled, (state, { payload }) => {
        state.waterInfo.dailyRecords = payload;
        state.waterInfo.total = payload.reduce(
          (total, record) => total + record.amount,
          0
        );
        state.loading = false;
      })
      .addCase(waterPerDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
        state.waterInfo.dailyRecords = [];
      })
      .addCase(fetchWater.pending, waterPending)
      .addCase(fetchWater.fulfilled, (state, { payload }) => {
        state.waterInfo.total = payload.total;
        state.loading = false;
      })
      .addCase(fetchWater.rejected, waterRejected)
      .addCase(updateWater.pending, waterPending)
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waterInfo.dailyRecords.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.waterInfo.dailyRecords[index] = action.payload.data;
        }
      })
      .addCase(updateWater.rejected, waterRejected)
      .addCase(deleteWater.pending, waterPending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        const waterId = action.meta.arg;
        state.waterInfo.dailyRecords = state.waterInfo.dailyRecords.filter(
          (item) => item._id !== waterId
        );
      })
      .addCase(deleteWater.rejected, waterRejected)
      .addCase(waterPerMonth.pending, waterPending)
      .addCase(waterPerMonth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.monthlyRecords = payload;
      })
      .addCase(waterPerMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.monthlyRecords = [];
      });
  },
});

export const { setSelectedDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
