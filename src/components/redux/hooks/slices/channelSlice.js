import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channel: undefined,
    },
    reducers: {
        addCurrentChannel: (state, action) => {
            console.log("HERE channelSlice action: ", action)
            return {
                ...state,
                channel: action.payload
            }
        }
    }
});

export const { addCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;