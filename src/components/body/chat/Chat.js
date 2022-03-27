import React, { useState, useEffect, useCallback } from 'react';
import { ChannelList } from './ChannelList';
import './chat.css';
import { MessagesPanel } from './messages/MessagesPanel';
import socketClient from "socket.io-client";

const localServer = "http://localhost:3000";
const herokuserver = "https://pacific-sierra-45747.herokuapp.com";

const SERVER = herokuserver;

export const Chat = () => {

    const [stateChannels, setStateChannels] = useState();
    const [stateCurrentChannel, setStateCurrentChannel] = useState();

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    let currentSocket;

    useEffect(() => {
        loadChannels();
        configureSocket();

    }, [currentSocket]);

    const configureSocket = () => {
        var socket = socketClient(SERVER);

        socket.on('connection', () => {
            if (stateCurrentChannel) {
                handleChannelSelect(stateCurrentChannel.id);
            }
        });

        socket.on('channel', channel => {
            let channels = stateChannels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            setStateChannels(channels);
            forceUpdate();
        });

        socket.on('message', message => {
            let channels = stateChannels;
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            setStateChannels(channels);
            forceUpdate();
        });

        currentSocket = socket;
    }

    const loadChannels = async () => {
        fetch(`${SERVER}/getChannels`).then(async response => {
            let data = await response.json();
            setStateChannels(data.channels);
        })
    }

    const handleChannelSelect = id => {
        let channel = stateChannels.find(c => {
            return c.id === id;
        });
        setStateCurrentChannel(channel)
        currentSocket.emit('channel-join', id, ack => {
        });
    }

    const handleSendMessage = (channel_id, text) => {
        currentSocket.emit('send-message', { channel_id, text, senderName: currentSocket.id, id: Date.now() });
    }

    return (
        <div className='chat-app'>
            <ChannelList channels={stateChannels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={stateCurrentChannel} />
        </div>
    );
}