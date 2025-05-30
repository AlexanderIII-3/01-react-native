import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleLogin: (state, action) => {
            state.userInfo = action.payload;
        },
        handleLogout: (state) => {
            state.userInfo = null;
        },
    },
});

export const { handleLogin, handleLogout } = userSlice.actions;
export default userSlice.reducer;
