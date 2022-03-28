import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const linkElement = screen.getByText(/HEAD/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App User', () => {
  test('App Render', () => {
    render(<App />);
    const linkElement = screen.getByText(/HEAD/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Renders Head, Body and Id modale when builded', () => {

    render(<App />);

    const idElement = screen.getByText(/Type a name/i);
    expect(idElement).toBeInTheDocument();
    const headElement = screen.getByText(/HEAD/i);
    expect(headElement).toBeInTheDocument();
    const noChannelElement = screen.getByText(/There is no channels to show/i);
    expect(noChannelElement).toBeInTheDocument();
    const noMessageElement = screen.getByText(/There is no messages to show/i);
    expect(noMessageElement).toBeInTheDocument();
  });

  test('test', () => {

    render(<App />);

    // const textbox = screen.getByRole('textbox');
    // const sendButton = screen.getByRole('button');
    // textbox.value = "UserName";
    // console.log(textbox.value);

    // App.setName("UserName")

    // console.log(App);

    // userEvent.click(sendButton);

    // console.log(screen.getByRole('textbox'));

    // const newText = screen.getByRole('textbox');
    // expect(newText).toBeInTheDocument();


    //console.log(screen.getByRole('button').onClick());

  });
});
