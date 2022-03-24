import React, { useEffect, useRef } from 'react';

import socketClient from "socket.io-client";

import { useSelector, useDispatch } from 'react-redux';
import { addChannels } from '../../redux/hooks/slices/channelsSlice';
import { addCurrentChannel } from '../../redux/hooks/slices/channelSlice';

import './chat.css';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './messages/MessagesPanel';


const localServer = "http://localhost:3000";
const herokuserver = "https://pacific-sierra-45747.herokuapp.com";

const SERVER = herokuserver;

const Chat = () => {

    const dispatch = useDispatch();
    const stateChannels = useSelector((state) => state.channels);
    const stateChannel = useSelector((state) => state.channel);
    const user = useSelector((state) => state.user);

    const socket = useRef(undefined);
    let testVar = 'test1';

    const handleChannelSelect = id => {
        console.log("HERE handleChannelSelect")
        let channel = stateChannels.channels.find(c => {
            return c.id === id;
        });
        //setState({ channel });
        dispatch(addCurrentChannel(channel));
        //const value = socket.current;
        socket.current.emit('channel-join', id, ack => {
        });
    }

    const handleChannel = channel => {
        console.log("HERE handleChannel channel: ", channel)
        console.log("HERE test: ", testVar)
        console.log("HERE in handleChannel: stateChannels: ", stateChannels)
        console.log("HERE in handleChannel stateChannel: ", stateChannel)
        let channels = stateChannels.channels;
        console.log("HERE in handleChannel channels: ", channels)
        if (Array.isArray(channels)) {
            channels.forEach(c => {
                console.log("HERE c: ", c)
                if (c.id === stateChannel.channel.id) {
                    c.participants = channel.participants;
                }
            });
            console.log("HERE: channels: ", channels)
            dispatch(addChannels(channels));
        }
    }

    const configureSocket = () => {
        console.log("HERE configureSocket")
        const _socket = socketClient(SERVER);

        _socket.on('connection', () => {
            console.log("HERE _socket.on('connection'")
            if (stateChannel.channel) {
                handleChannelSelect(stateChannel.channel.id);
            }
        });

        _socket.on('channel', handleChannel);

        _socket.on('message', message => {
            console.log("HERE _socket.on('message'")
            let channels = stateChannels.channels;
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
                dispatch(addChannels(channels));
            }
        });
        socket.current = _socket;
    }

    useEffect(() => {

        fetch(`${SERVER}/getChannels`)
        .then(response => response.json())
        .then( async (responseJson) => {
            let data = responseJson;
            dispatch(addChannels(data.channels))
        })

        configureSocket();

        testVar = 'test2';
        console.log("HERE setting testvar to: ", testVar)
        //dispatch(addSocket(_socket));
    }, [stateChannels]);

    const handleSendMessage = (channel_id, text) => {
        console.log("HERE: handleSendMessage")
        socket.emit('send-message', { channel_id, text, senderName: user.user, id: Date.now() });
    }

    console.log("HERE test: ", testVar)
    console.log("HERE render stateChannels: ", stateChannels)
    console.log("HERE render stateChannel: ", stateChannel)

    return (
        <div className='chat-app'>
            <ChannelList channels={stateChannels.channels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={stateChannel.channel} />
        </div>
    );
};

export default Chat;