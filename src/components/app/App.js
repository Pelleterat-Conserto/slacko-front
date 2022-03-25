import React from 'react';
import { Head } from '../head/Head';
import { Body } from '../body/Body';

import './App.css';

const App = () => {

  const username = 'test name'

  return (
    <div className="App">
      <Head username={username}/>
      <Body />
    </div>
  );
}

export default App;
