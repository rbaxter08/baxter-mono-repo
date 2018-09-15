import * as React from 'react';
import * as io from 'socket.io-client';

import './App.scss';

const socket = io('http://localhost');

class App extends React.Component {
  componentDidMount() {
    socket.on('connect', () => {
      console.log(socket.id); // 'G5p5...'
    });
  }

  render() {
    return (
      <div id="app-container">
        WAR GAME
      </div>
    );
  }
}

export default App;
