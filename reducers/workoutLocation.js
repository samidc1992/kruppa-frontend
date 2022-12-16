import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        label: null,
        latitude: null,
        longitude: null
    },
};

export const workoutLocationSlice = createSlice({
    name: 'workoutLocation',
    initialState,
    reducers: {
        saveWorkoutLocation: (state, action) => {
            state.value = {
                label: action.payload.label,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }
        },
        removeWorkoutLocation: (state) => {
            state.value = {
                label: null,
                latitude: null,
                longitude: null
            }
        },
    },
});

export const { saveWorkoutLocation, removeWorkoutLocation } = workoutLocationSlice.actions;
export default workoutLocationSlice.reducer;