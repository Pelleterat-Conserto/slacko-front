import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: undefined,
    },
    reducers: {
        addSocket: (state, action) =>  action.payload
    }
});

export const { addSocket } = socketSlice.actions;
export default socketSlice.reducer;