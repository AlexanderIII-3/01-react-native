import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    doctorInfor: [],
    listTime: []
};

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setDoctors: (state, action) => {
            state.list = action.payload;
        },
        getDoctorInfo: (state, action) => {
            state.doctorInfor = action.payload


        },
        getListTimeBooking: (state, action) => {

            state.listTime = action.payload
        }
    },
});

export const { setDoctors, getDoctorInfo, getListTimeBooking } = doctorSlice.actions;
export default doctorSlice.reducer;
