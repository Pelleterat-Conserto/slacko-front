import React, { useEffect, useRef, useState, useCallback } from 'react';

import socketClient from "socket.io-client";

import './chat.css';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './messages/MessagesPanel';


const localServer = "http://localhost:3000";
const herokuserver = "https://pacific-sierra-45747.herokuapp.com";

const SERVER = localServer;

const Chat = ({ username }) => {

    const [stateChannels, setStateChannels] = useState();
    const [stateCurrentChannel, setStateCurrentChannel] = useState();

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const refSocket = useRef(undefined);

    const getChannels = () => stateChannels;

    const handleChannelSelect = id => {
        console.log("HERE: handleChannelSelect, id: ", id)
        let channel = stateChannels.find(c => {
            return c.id === id;
        });

        setStateCurrentChannel({channel})

        refSocket.current.emit('channel-join', id, ack => {
        });      
    }

    const onSocketConnection = () => {
        if (stateCurrentChannel) {
            handleChannelSelect(stateCurrentChannel.id);
        }
    };

    const onSocketMessage = message => {
        console.log("HERE OnMessage: ", message)
        let channels = stateChannels;
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
            setStateChannels(channels, forceUpdate)
        }
    };

    useEffect(() => {

        fetch(`${SERVER}/getChannels`)
        .then(response => response.json())
        .then( async (responseJson) => {
            let data = responseJson;
            setStateChannels(data.channels);
        })

        const _socket = socketClient(SERVER);

        _socket.on('connection', onSocketConnection);

        _socket.on('channel', onSocketChannel);

        _socket.on('message', onSocketMessage);

        refSocket.current = _socket;

    }, []);

    const handleSendMessage = (channel_id, text) => {
        //console.log("HERE handleSendMessage")
        refSocket.current.emit('send-message', { channel_id, text, senderName: username, id: Date.now() });
    }

    console.log("HERE render stateChannels: ", stateChannels)
    console.log("HERE render stateChannel: ", stateCurrentChannel)

    const onSocketChannel = channel => {
        console.log("HERE onSocketChannel: ", channel, stateChannels)
        let channels = getChannels();
        console.log("HERE onSocketChannel: ", channel, stateChannels)
        if (Array.isArray(channels)) {
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            setStateChannels(channels, forceUpdate)
        }
    };

    return (
        <div className='chat-app'>
            <ChannelList channels={stateChannels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={stateCurrentChannel} />
        </div>
    );
};

export default Chat;