import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setDoctors: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { setDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
