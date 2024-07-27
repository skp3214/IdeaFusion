import { createSlice } from "@reduxjs/toolkit";

// Utility functions for localStorage
const setLoginStatus = (status) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("loginStatus", status);
    }
};

const getLoginStatus = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("loginStatus") === "true";
    }
};

const setUserData = (userData) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("userData", JSON.stringify(userData));
    }
};

const getUserData = () => {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem("userData");
        return userData ? JSON.parse(userData) : null;
    }
};

// Initial state
const initialState = {
    status: getLoginStatus(),
    userData: getUserData()
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            setLoginStatus(true);
            setUserData(action.payload);
            console.log("Saved User Data", state.userData);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            setLoginStatus(false);
            localStorage.removeItem("userData");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
