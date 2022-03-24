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

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CHANNELS:
            console.log("HERE: ADD_CHANNELS");
            return {
                ...state,
                channels: action.payload
            }

        case ADD_CHANNEL:
            console.log("HERE: ADD_CHANNEL");
            return {
                ...state,
                channel: action.payload
            }    

        case ADD_SOCKET:
            return { socket: action.payload }

        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
