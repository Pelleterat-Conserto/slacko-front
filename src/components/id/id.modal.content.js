import React, { useState } from 'react';
import './id.modal.content.css';

export const IdModal = ({ onValidate, ...passThroughProps }) => {

    const [name, setName] = useState("");

    const handleInput = () => {
        onValidate(name)
    };
    
    return (
        <div className="id-modal">
            <span>Type a name</span>
            <input placeholder="username" onChange={e => setName(e.target.value)} value={name}/>
            <button onClick={() => handleInput()}>Send</button>
        </div>
    )

}