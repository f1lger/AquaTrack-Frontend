export const selectUser = (state) => state.users.user;
export const selectAllUsersCount = (state) => state.users.usersCount;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsRefreshing = (state) => state.user.isRefreshing;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserWaterNorm = (state) => state.users.user.liters;
export const selectUserToken = (state) => state.users.user.token;
export const selectRefreshToken = (state) => state.users.user.refreshToken;

export default { selectUser };
