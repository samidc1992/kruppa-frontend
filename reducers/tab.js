import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        leftTabFocused : true,
         middleTabFocused : false,
        rightTabFocused : false
    }
};

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        handleLeftTabFocused: (state, action) => {
            state.value.leftTabFocused = action.payload
        },
        handleMiddleTabFocused: (state, action) => {
            state.value.middleTabFocused = action.payload
        },
        handleRightTabFocused: (state, action) => {
            state.value.rightTabFocused = action.payload
        },

        },
    },
);

export const {handleLeftTabFocused, handleMiddleTabFocused, handleRightTabFocused } = tabSlice.actions;
export default tabSlice.reducer;