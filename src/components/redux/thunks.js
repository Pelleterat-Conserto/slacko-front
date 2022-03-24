import {
    ADD_CHANNELS,
    ADD_CHANNEL,
    ADD_SOCKET
} from './actions/actions';

import { addChannels } from './actions/actions'

// setChannel is the "thunk action creator"
export function setChannel(channel) {
    // dispatchSetChannel is the "thunk function"
    return async function dispatchSetChannel(dispatch, getState) {
        let channels = getState().channels;
        console.log("HERE onSocketChannel channels: ", channels)
        if (Array.isArray(channels)) {
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            dispatch(addChannels(channels))
        }
    }
  }