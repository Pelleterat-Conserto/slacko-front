import React, { useState } from 'react';
import { Message } from './Message';

export const MessagesPanel = ({onSendMessage, channel}) => {

    const [inputValue, setInputValue ] = useState('');
    
    const send = () => {
        if (inputValue && inputValue !== '') {
            onSendMessage(channel.id, inputValue);
            setInputValue('');
        }
    }

    const handleInput = e => {
        setInputValue(e.target.value);
    }

    const handleKey = e => {
        if (e.charCode === 13 || e.code === "Enter" || e.key === "Enter") {
            send();
        }
    }

    let list = <div className="no-content-message">There is no messages to show</div>;
    
    if (channel && channel.messages) {
        list = channel.messages.map(m => <Message key={m.id} id={m.id} senderName={m.senderName} text={m.text} />);
    };

    return (
        <div className='messages-panel'>
            <div className="messages-list">{list}</div>
            {channel &&
                <div className="messages-input">
                    <input type="text" onChange={handleInput} onKeyPress={handleKey} value={inputValue} />
                    <button onClick={send}>Send</button>
                </div>
            }
        </div>);
}