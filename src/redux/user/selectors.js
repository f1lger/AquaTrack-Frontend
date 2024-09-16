export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsRefreshing = (state) => state.user.isRefreshing;
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserWaterNorm = (state) => state.user.user.liters;
export const selectUserToken = (state) => state.user.token;
export const selectRefreshToken = (state) => state.user.refreshToken;

export default { selectUser };
