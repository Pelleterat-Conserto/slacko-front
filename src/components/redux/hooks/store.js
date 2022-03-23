import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice';
import socketReducer from './slices/socketSlice';
import channelReducer from './slices/channelSlice';

export default configureStore({
    reducer: {
        channels: channelsReducer,
        socket: socketReducer,
        channel: channelReducer
    }
})