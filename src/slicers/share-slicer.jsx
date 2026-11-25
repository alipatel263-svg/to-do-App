import { createSlice } from "@reduxjs/toolkit"

let initialState ={
    sharedAppointments:[],
    sharedAppointmentsCount: 0
}

const ShareSlicer = createSlice({
    name: 'share-slicer',
   initialState,
    reducers:{
        AddToShare:(state, action)=> {
            state.sharedAppointments.push(action.payload);
            state.sharedAppointmentsCount = state.sharedAppointments.length;
        }
    }
})

export const {AddToShare} = ShareSlicer.actions;
export default ShareSlicer.reducer;
