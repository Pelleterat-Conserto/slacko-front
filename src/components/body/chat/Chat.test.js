import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Chat from './Chat';

function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

describe('Chat', () => {
  test('fetches stories from an API and displays them', async () => {

    const STATIC_CHANNELS = [{
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

    window.fetch = mockFetch(STATIC_CHANNELS);

    render(<Chat />);

    await waitFor(() => {
        expect(screen.getByText('General')).toBeInTheDocument() // Nope. The component is still not update
      })

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});