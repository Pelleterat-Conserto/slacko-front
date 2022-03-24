import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'


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
            console.log("HERE: ADD_CHANNELS state: ", state);
            console.log("HERE: ADD_CHANNELS action: ", action);
            const channels = action.payload;
            return {
                ...state,
                channels
            }

        case ADD_CHANNEL:
            console.log("HERE: ADD_CHANNEL state: ", state);
            console.log("HERE: ADD_CHANNEL action: ", action);
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

export const store = createStore(reducer, applyMiddleware(thunk));
