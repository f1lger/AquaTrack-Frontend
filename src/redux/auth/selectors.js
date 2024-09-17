export const selectUserEmail = (state) => state.auth.user.email;
export const selectDailyNorma = (state) => state.auth.user.dailyNorma;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoggerIn = (state) => state.auth.isLogedIn;
// export const selectUser = (state) => {
//   return state.auth.userInfo;
// };
// Файл: auth/selectors.js
export const selectUser = (state) => state.auth.user;
export const selectUserAvatar = (state) => state.auth.selectUserAvatar;
