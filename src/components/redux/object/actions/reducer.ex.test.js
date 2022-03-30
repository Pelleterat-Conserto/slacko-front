import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import reducer, {
    ADD_CHANNELS,
    RENAME_CHANNEL,
    SELECT_CHANNEL,
    ADD_USER,
} from './reducer';

const CHANNELS = [{
    name: 'General',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'H.S.',
    participants: 0,
    id: 2,
    sockets: []
}];

const oldState = {channels: CHANNELS};

describe('reducers', () => {
 
    describe('work as a reducer', () => {

    it('should return new state from add_channels action', () => {
        const action = {
            type: ADD_CHANNELS,
            payload: CHANNELS
        };

        expect(reducer({}, action)).toEqual({channels: CHANNELS});
      });

      it('should return new channel name', () => {
        const action = {
            type: RENAME_CHANNEL,
            payload: {
                id: 1,
                newName: 'test'
            }
        };

        expect(reducer(oldState, action).channels[0].name).toEqual('test');
        expect(oldState.channels[0].name).not.toEqual('test');
      });

    //   it('should return user', () => {
       
    //   });

    // it('should return user', () => {
      
    // });

    });

});




// ADD_CHANNELS
// ADD_USER
// default