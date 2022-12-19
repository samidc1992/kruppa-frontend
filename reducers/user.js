import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        token: null,
        username: null,
        userAge : null,
        favoriteSports : [],
        description: null,
        
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
           // state.value.username = action.payload.username;
           // state.value.userAge = action.payload.userAge;
           // state.value.description = action.payload.description;
        },
        logout: (state) => {
            state.value.token = null;
            state.value.username = null;
        },
        addFavoriteSports: (state, action) => {
          state.value.favoriteSports = action.payload;
        },

       /*  updateDate : (state, action) => {
            state.value.userAge = action.payload.userAge;
        }, */

        removeSport: (state, action) => {
            /*  state.value.favoriteSports = state.value.favoriteSports.filter(e => {
                e.sport !== action.payload.sport && e.level !== action.payload.level
            }) */
          },
    
    },
});

export const { login, logout, updateDate, addFavoriteSports } = userSlice.actions;
export default userSlice.reducer;