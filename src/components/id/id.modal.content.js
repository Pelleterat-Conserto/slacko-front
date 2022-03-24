import React, { useState } from 'react';
import './id.modal.content.css';

export const IdModal = ({ action }) => {

    const [name, setName] = useState("");

    const handleInput = () => {
        action(name)
    };
    
    return (
        <div className="id-modal">
            <input placeholder="username" onChange={e => setName(e.target.value)} value={name}/>
            <button onClick={() => handleInput()}>Send</button>
        </div>
    )

}