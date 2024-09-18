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
      total: null,
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
      .addCase(addWater.fulfilled, (state, action) => {
        const { amount, date } = action.payload.data;
        state.waterInfo.dailyRecords.push({ amount, date });
        if (date.split("T")[0] === state.currentDay) {
          state.waterInfo.total += amount;
        }      
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
        const { waterId, waterRecord } = action.payload;
        const index = state.waterInfo.dailyRecords.findIndex(
          (record) => record._id === waterId
        );
        if (index !== -1) {
          state.waterInfo.dailyRecords[index] = {
            ...state.waterInfo.dailyRecords[index],
            ...waterRecord,
          };
        }

        state.loading = false;
      })
      .addCase(updateWater.rejected, waterRejected)
      .addCase(deleteWater.pending, waterPending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        const waterId = action.meta.arg;
        state.waterInfo.dailyRecords = state.waterInfo.dailyRecords.filter(
          (item) => item._id !== waterId
        );
        // console.log( state.waterInfo.dailyRecords);
        state.loading = false;
      })
      .addCase(deleteWater.rejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
