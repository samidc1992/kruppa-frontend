import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        group_id: null,
        group_name: null,
        joined: false
    }
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        storeGroupId: (state, action) => {
            state.value.group_id = action.payload;
        },
        storeGroupName: (state, action) => {
            state.value.group_name = action.payload;
        }
    },
});

export const { storeGroupId, storeGroupName } = groupSlice.actions;
export default groupSlice.reducer;