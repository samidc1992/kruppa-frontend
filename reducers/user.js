import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        token: null,
        username: null,
        favoriteSports : [],
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.username = action.payload.username;
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
        },
        addFavoriteSports: (state, action) => {
          state.value.favoriteSports = action.payload;
        },
        removeSport: (state, action) => {
           
        },
    },
});

export const { login, logout, updateDate, addFavoriteSports } = userSlice.actions;
export default userSlice.reducer;