import React, { useEffect } from 'react';

import socketClient from "socket.io-client";

import { useSelector, useDispatch } from 'react-redux';
import { addChannels } from '../../redux/hooks/slices/channelsSlice';
import { addChannel } from '../../redux/hooks/slices/channelSlice';

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
    const stateSocket = useSelector((state) => state.socket);
    const user = useSelector((state) => state.user);

    let socket;

    const handleChannelSelect = id => {
        console.log("HERE: handleChannelSelect, id: ", id)
        let channel = stateChannels.channels.find(c => {
            return c.id === id;
        });
        //setState({ channel });
        dispatch(addChannel(channel));
        stateSocket.socket.emit('channel-join', id, ack => {
        });
    }


    useEffect(() => {

        fetch(`${SERVER}/getChannels`)
        .then(response => response.json())
        .then( async (responseJson) => {
            let data = responseJson;
            dispatch(addChannels(data.channels))
        })

        const _socket = socketClient(SERVER);
        _socket.on('connection', () => {
            if (stateChannel.channel) {
                handleChannelSelect(stateChannel.channel.id);
            }
        });
        _socket.on('channel', channel => {
            let channels = stateChannels.channels;
            if (Array.isArray(channels)) {
                channels.forEach(c => {
                    if (c.id === channel.id) {
                        c.participants = channel.participants;
                    }
                });
                dispatch(addChannels(channels));
            }
        });

        _socket.on('message', message => {
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
        socket = _socket;
        //dispatch(addSocket(_socket));
}, []);

    const handleSendMessage = (channel_id, text) => {
        socket.emit('send-message', { channel_id, text, senderName: user.user, id: Date.now() });
    }

    console.log("HERE test stateChannels: ", stateChannels)
    console.log("HERE test stateChannel: ", stateChannel)

    return (
        <div className='chat-app'>
            <ChannelList channels={stateChannels.channels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={stateChannel.channel} />
        </div>
    );
};

export default Chat;
