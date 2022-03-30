export const ADD_CHANNELS = 'ADD_CHANNELS';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const ADD_USER = 'ADD_USER';
export const RENAME_CHANNEL = 'RENAME_CHANNEL';


const reducers = (oldState = {}, action)=> {
    switch (action.type) {
      case RENAME_CHANNEL:
        const newChannels = oldState.channels.map(ch => {
          if (ch.id === action.payload.id) {
            return {
            ...ch, name: action.payload.newName
          }
        }
          return {
            ...ch
          }
        })
        console.log(newChannels);
          return {...oldState, channels: newChannels}
      case ADD_CHANNELS:
        return {...oldState,channels:action.payload}
      case ADD_USER:
        return {...oldState,user:action.payload}
      default:
        return oldState
    }
} 

export default reducers;