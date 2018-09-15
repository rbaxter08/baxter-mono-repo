import * as React from 'react';

import Sidebar from '@Common/Sidebar';
import ViewPort from './components/ViewPort';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div id="app-container">
        <Sidebar />
        <ViewPort />
      </div>
    );
  }
}

export default App;
