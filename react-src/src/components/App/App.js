import React from 'react';
import { Container } from 'semantic-ui-react';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';

import './App.css';

const App = () => {

  const server = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  const socket = io.connect(server);

  return (
    <div>
      <div className='App'>
        <div className='App-header'>
          <h1 className='App-intro'>醫囑管理系統</h1>
        </div>
      </div>
      <Container>
        <TableUser
          server={server}
          socket={socket}
        />
      </Container>
      <br/>
    </div>
  );
}

export default App;
