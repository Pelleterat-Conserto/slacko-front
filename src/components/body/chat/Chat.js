import React, { useEffect, useRef } from 'react';

import socketClient from "socket.io-client";

import {
    ADD_CHANNELS,
    ADD_CHANNEL,
    ADD_SOCKET
} from '../../redux/object/actions/actions';

import './chat.css';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './messages/MessagesPanel';

import { store } from '../../redux/object/store';


const localServer = "http://localhost:3000";
const herokuserver = "https://pacific-sierra-45747.herokuapp.com";

const SERVER = localServer;

const Chat = ({ username }) => {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const refSocket = useRef(undefined);

    const handleChannelSelect = id => {
        console.log("HERE: handleChannelSelect, id: ", id)
        let channel = store.getState().channels.find(c => {
            return c.id === id;
        });
        console.log("HERE: handleChannelSelect, channel: ", channel)
        // setState({ channel });

        store.dispatch({
            type: ADD_CHANNEL,
            payload: channel
        })

        refSocket.current.emit('channel-join', id, ack => {
        });      
    }

    const onSocketConnection = () => {
        if (store.getState().channel) {
            handleChannelSelect(store.getState().channel.id);
        }
    };

    const onSocketChannel = channel => {
        console.log("HERE onSocketChannel: ", channel)
        let channels = store.getState().channels;
        console.log("HERE onSocketChannel channels: ", channels)
        if (Array.isArray(channels)) {
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            store.dispatch({
                type: ADD_CHANNELS,
                payload: channels
            })
        }
        forceUpdate();
    };

    const onSocketMessage = message => {
        console.log("HERE On message: ", message)
        let channels = store.getState().channels;
        if (Array.isArray(channels)) {
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            store.dispatch({
                type: ADD_CHANNELS,
                payload: channels
            })
        }
        forceUpdate();
    };


    useEffect(() => {

        fetch(`${SERVER}/getChannels`)
        .then(response => response.json())
        .then( async (responseJson) => {
            let data = responseJson;
            store.dispatch({
                type: ADD_CHANNELS,
                payload: data.channels
            })
        })

        const _socket = socketClient(SERVER);

        _socket.on('connection', onSocketConnection);

        _socket.on('channel', onSocketChannel);

        _socket.on('message', onSocketMessage);

        refSocket.current = _socket;

    }, []);

    const handleSendMessage = (channel_id, text) => {
        refSocket.current.emit('send-message', { channel_id, text, senderName: username, id: Date.now() });
    }

    const channels = store.getState().channels;
    const currentChannel = store.getState().channel;
    console.log("HERE render stateChannels: ", channels)
    console.log("HERE render stateChannel: ", currentChannel)

    // const unsubscribe = store.subscribe(onSocketChannel)
    // //unsubscribe()

    return (
        <div className='chat-app'>
            <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={currentChannel} />
        </div>
    );
};

export default Chat;