// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt';

const config = useJwt.jwtConfig;

const initialUser = () => {
    const item = window.localStorage.getItem('userData');
    return item ? JSON.parse(item) : {};
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: initialUser(),
    },
    reducers: {
        handleLogin: (state, action) => {
            state.userData = action.payload;
            state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName];
            state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName];
            localStorage.setItem('userData', JSON.stringify(action.payload));
            localStorage.setItem(config.storageTokenKeyName, action.payload.accessToken);
            localStorage.setItem(config.storageRefreshTokenKeyName, action.payload.refreshToken);
        },
        refreshToken: (state, action) => {
            state.userData = action.payload;
            state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName];
            localStorage.setItem(config.storageTokenKeyName, action.payload.accessToken);
        },
        handleLogout: (state) => {
            state.userData = {};
            state[config.storageTokenKeyName] = null;
            state[config.storageRefreshTokenKeyName] = null;
            localStorage.removeItem('userData');
            localStorage.removeItem(config.storageTokenKeyName);
            localStorage.removeItem(config.storageRefreshTokenKeyName);
        },
    },
});

export const { handleLogin, handleLogout, handleRegister, refreshToken } = authSlice.actions;

export default authSlice.reducer;
