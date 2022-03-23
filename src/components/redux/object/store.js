import { createStore } from 'redux';

import {
    ADD_CHANNELS,
    ADD_CHANNEL,
    ADD_SOCKET
} from './actions/actions';

const initialState = {
    channels: [],
    socket: undefined,
    channel: undefined
}

function reducers(state = initialState, action) {

    // console.log("HERE: createStore action: ", action.payload);

    switch (action.type) {

        case ADD_CHANNELS:
            return { ...state, channels: action.payload }

        case ADD_CHANNEL:
            return { ...state, channel: action.payload }

        case ADD_SOCKET:
            return {  ...state, socket: action.payload }

        default:
            return state;
    }
}

export const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
