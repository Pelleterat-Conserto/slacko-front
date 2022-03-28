import React, { useState } from 'react';
import { Head } from '../head/Head';
import { Body } from '../body/Body';

import { InModal } from '../modal/modal';
import { IdModal } from '../id/id.modal.content';
import './App.css';

const App = () => {

  const [username, setUsername] = useState('')

  const setName = name => {
    setUsername(name);
  }

  const cancel = e => {
    console.log("HERE: Cancel")
  }

  console.log("HERE: username: ", username)

  return (
    <div className="App">
      {!username &&
        <InModal
          NestedComp={IdModal}
          onValidate={setName}
          onCancel={cancel}
          anotherProp="another prop"
          anotherOtherProp="another other prop"
        />}
      <Head username={username}/>
      <Body username={username}/>
    </div>
  );
}

export default App;
