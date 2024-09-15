export const selectTotalWater = (state) => state.water.waterInfo.total;
export const selectWaterLoading = (state) => state.water.loading;
export const selectWaterError = (state) => state.water.error;
export const selectDailyRecords = (state) => state.waterInfo.dailyRecords;
export const selectMonthlyRecords = (state) => state.monthlyRecords;
export const selectCurrentDay = (state) => state.currentDay;
export const selectCurrentMonth = (state) => state.currentMonth;