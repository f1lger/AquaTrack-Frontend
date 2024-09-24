export const selectTotalWater = (state) => state.water.waterInfo.total;
export const selectWaterLoading = (state) => state.water.loading;
export const selectWaterError = (state) => state.water.error;
export const selectDailyRecords = (state) => state.water.waterInfo.dailyRecords;
export const selectMonthlyRecords = (state) => state.water.monthlyRecords;
export const selectCurrentDay = (state) => state.water.currentDay;
export const selectCurrentMonth = (state) => state.water.currentMonth;
export const selectedDate = (state) => state.water.selectedDate; //для отримання обраної дати
