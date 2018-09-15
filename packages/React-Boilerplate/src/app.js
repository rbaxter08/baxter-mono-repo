import React, { Component } from "react";
import { Button } from 'reactstrap';

import Sidebar from './components/Sidebar';
import ViewPort from './components/ViewPort';

import './App.css';

class App extends Component {
    render() {
        return (
            <div id="app-container">
              <Sidebar/>
              <ViewPort/>
            </div>
        );
    }
}

export default App;