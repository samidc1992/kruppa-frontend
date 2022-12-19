import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        storeGroupId: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { storeGroupId } = groupSlice.actions;
export default groupSlice.reducer;