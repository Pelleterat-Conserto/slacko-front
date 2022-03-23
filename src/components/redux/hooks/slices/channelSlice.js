import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channel: undefined,
    },
    reducers: {
        addChannel: (state, action) =>  action.payload
    }
});

export const { addChannel } = channelSlice.actions;
export default channelSlice.reducer;