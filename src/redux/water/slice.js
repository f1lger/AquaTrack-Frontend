import { createSlice } from "@reduxjs/toolkit";
import { addWater, deleteWater, fetchWater, updateWater } from "./operations";

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
      total: 900,
      dailyRecords: [],
    },
    monthlyRecords: [],
    currentDay: new Date().toISOString().split("T")[0],
    currentMonth: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.pending, waterPending)
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.waterInfo.total += payload.amount;
        state.loading = false;
      })
      .addCase(addWater.rejected, waterRejected)
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
      .addCase(deleteWater.rejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
