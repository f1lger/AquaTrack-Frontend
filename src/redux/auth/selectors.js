export const selectUserEmail = (state) => state.auth.user.email;
export const selectDailyNorma = (state) => state.auth.user.dailyNorma;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const selectUserToken = (state) => state.user.token;
export const selectRefreshToken = (state) => state.user.refreshToken;

export default { selectUser };
