import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: undefined,
    },
    reducers: {
        addSocket: (state, action) => {
            console.log("HERE: addSocket: action: ", action);
            return action.payload;
        }
    }
});

export const { addSocket } = socketSlice.actions;
export default socketSlice.reducer;