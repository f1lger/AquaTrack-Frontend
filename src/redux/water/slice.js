import { createSlice } from "@reduxjs/toolkit";
import { addWater, fetchWater } from "./operations";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterInfo: {
      total: 900,
    },
    loading: false,
    error: null,
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
      });
  },
});

export const waterReducer = waterSlice.reducer;
