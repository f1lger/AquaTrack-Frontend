export const selectUserEmail = (state) => state.auth.user.email;
export const selectDailyNorma = (state) => state.auth.user.dailyNorma;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
