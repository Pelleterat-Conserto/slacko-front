export const ADD_CHANNELS = 'addChannels';
export const ADD_CHANNEL = 'addChannel';
export const ADD_SOCKET = 'addSocket';

export const addChannels = (content) => {
  const channels = [...content];
  console.log("HERE addChannels: channels: ", channels);
  return ({
  type: ADD_CHANNELS,
  payload: [
    ...channels
  ]
})}

export const addChannel = (content) => {
  const channel = content;
  console.log("HERE addChannel: channel: ", channel);
  return ({
  type: ADD_CHANNEL,
  payload: channel
})}

export const addSocket = (content) => {
  const socket = content;
  console.log("HERE addSocket: socket: ", socket);
  return ({
  type: ADD_SOCKET,
  payload: socket
})}