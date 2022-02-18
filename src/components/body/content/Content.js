import './Content.css';
import openSocket from 'socket.io-client';

import { Chat } from '../chat/Chat';

// const SERVER = "http://127.0.0.1:9800";
// const LOCAlSERVER = "http://localhost:9800"

export const Content = () => {

  const socket = openSocket('http://localhost:9800', {transports: ['websocket']});

  socket.on('connection', () => {
      console.log(`HERE: I'm connected with the back-end`);
  });

  socket.on('channel', (data) => {
    console.log(`HERE: data: `, data);
  });
  
  return (
    <div className="content" >
      <Chat socket={socket}/>
    </div>
  );
};
  