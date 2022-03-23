import { createSlice } from '@reduxjs/toolkit';
import { current } from "immer"

export const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channels: [],
    },
    reducers: {
        addChannels: (state, action) => {
            const currentChannels = current(state).channels;
            const payloadChannels = action.payload;
            const channels = payloadChannels.filter(channel => !currentChannels.find(element => element.id !== channel.id));
            state.channels.push(...channels);
        }
    }
});

export const { addChannels } = channelsSlice.actions;
export default channelsSlice.reducer;