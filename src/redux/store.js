import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { waterReducer } from "./water/slice";
import { usersReducer } from "./user/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    water: waterReducer,
    users: usersReducer,
  },
});
