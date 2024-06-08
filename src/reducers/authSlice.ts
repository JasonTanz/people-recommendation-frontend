import cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInitialState } from "./types";

const initialState = {
    user:
        cookie.get("userVP") !== undefined
            ? JSON.parse(cookie.get("userVP")!)
            : {},
    isAuthenticated: cookie.get("accessTokenVP") ? true : false,
    accessToken: cookie.get("accessTokenVP") ? cookie.get("accessTokenVP") : "",
} as AuthInitialState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOGIN: (state, action: PayloadAction<AuthInitialState>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            cookie.set("userVP", JSON.stringify(action.payload.user));
            cookie.set("isAuthenticatedVP", JSON.stringify(true));
            cookie.set("accessTokenVP", action.payload.accessToken);
        },

        LOGOUT: (state) => {
            state.user = null;
            state.accessToken = "";
            state.isAuthenticated = false;
            cookie.set("userVP", JSON.stringify(null));
            cookie.set("isAuthenticatedVP", JSON.stringify(false));
            cookie.set("accessTokenVP", "");
        },
    },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export const selectIsAuthenticated = (state: AuthInitialState) =>
    state.isAuthenticated;
export const selectUser = (state: AuthInitialState) => state.user;
export const accessToken = (state: AuthInitialState) => state.accessToken;
export default authSlice.reducer;
