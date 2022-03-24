import React, { useState } from 'react';
import { Head } from '../head/Head';
import { Body } from '../body/Body';

import { inModal } from '../modal/modal';
import { IdModal } from '../id/id.modal.content';
import './App.css';

const App = () => {

  const [username, setUsername] = useState('')

  const setName = name => {
    setUsername(name);
  }

  return (
    <div className="App">
      {!username && inModal(IdModal, setName)}
      <Head />
      <Body username={username}/>
    </div>
  );
}

export default App;
