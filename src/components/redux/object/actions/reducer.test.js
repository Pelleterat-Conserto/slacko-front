import reducer, {
    ADD_CHANNELS,
    SELECT_CHANNEL,
    ADD_USER,
} from './reducer';

export const CHANNELS = [{
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

describe('reducers', () => {
  describe('default', () => {
    it('should return default state on init', () => {
      expect(reducer(undefined, {})).toEqual({});
    });

    it('should return a loading state for a given uid', () => {
      expect(
        reducer(undefined, { type: ADD_CHANNELS, payload: CHANNELS })
      ).toEqual({ channels: CHANNELS});
    });
  });
});