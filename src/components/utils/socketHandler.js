import socketClient from "socket.io-client";

class SocketHandler {

    constructor(server) {
        // console.log("HERE Socket init")
        if (!server) {
            throw new Error("You should provide a server url to Socket Handler")
        }
        this.socket = socketClient(server);
        this.userName = "unknown user";
        return this;
    }

    setUserName (userName) {
        // console.log("HERE setUserName")
        this.userName = userName;
    }

    joinChannel (id) {
        // console.log("HERE Socket joinChannel")
        this.socket.emit('channel-join', id, ack => {
        }); 
    }

    sendMessage (channel_id, text) {
        // console.log("HERE Socket sendMessage this.userName: ", this.userName)
        this.socket.emit('send-message', { channel_id, text, senderName: this.userName, id: Date.now() });
    }

    setConnectionListener (callBack) {
        // console.log("HERE Socket setConnectionListener")
        this.socket.on('connection', callBack);
    }

    setChannelListener (callBack) {
        // console.log("HERE Socket setChannelListener")
        this.socket.on('channel', callBack);
    }

    setMessageListener (callback) {
        // console.log("HERE Socket setMessageListener")
        this.socket.on('message', callback);
    }

}

export default SocketHandler;