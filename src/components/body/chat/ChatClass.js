import React from 'react';

import socketClient from "socket.io-client";

import { connect } from 'react-redux'
import { addChannels, addCurrentChannel, addSocket } from '../../redux/actions/actions'

import './chat.css';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './messages/MessagesPanel';

const localServer = "http://localhost:3000";
const herokuserver = "https://pacific-sierra-45747.herokuapp.com";

const SERVER = herokuserver;

class Chat extends React.Component {

    socket;

    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        console.log("HERE configureSocket")
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            if (this.props.channel) {
                this.handleChannelSelect(this.props.channel.id);
            }
        });

        socket.on('channel', channel => {
            let channels = this.props.channels;

            if (Array.isArray(channels)) {
                channels.forEach(c => {
                    if (c.id === channel.id) {
                        c.participants = channel.participants;
                    }
                });
                this.props.updateChannels(channels);
            }
        });

        socket.on('message', message => {
            
            let channels = this.props.channels
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
                this.props.updateChannels(channels);
            }
        });

        this.socket = socket;
    }

    loadChannels = () => {
        fetch(`${SERVER}/getChannels`)
        .then(response => response.json())
        .then( async (responseJson) => {
            let data = responseJson;
            this.props.updateChannels(data.channels);
        })
    }

    handleChannelSelect = id => {
        let channel = this.props.channels.find(c => {
            return c.id === id;
        });
        this.props.updateCurrentChannel(channel);
        this.socket.emit('channel-join', id, ack => {
        });
    }

    handleSendMessage = (channel_id, text) => {
        console.log("HERE handleSendMessage data: ", channel_id, text)
        this.socket.emit('send-message', { channel_id, text, senderName: this.props.username, id: Date.now() });
    }

    render() {

        //console.log("HERE test: this.handleChannelSelect: ", this.handleChannelSelect)
        //console.log("HERE test: this.handleSendMessage: ", this.handleSendMessage)

        return (
            <div className='chat-app'>
                <ChannelList channels={this.props.channels} onSelectChannel={this.handleChannelSelect} />
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.props.channel} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    //console.log("HERE mapStateToProps: state: ", state)
    return {
        channels: state.channels,
        socket: state.channel,
        channel: state.channel
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateChannels: (channels) => dispatch(addChannels(channels)),
        updateCurrentChannel: (channel) => dispatch(addCurrentChannel(channel)),
        updateSocket: (socket) => dispatch(addSocket(socket))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
