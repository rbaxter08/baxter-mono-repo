import React, { Component } from 'react';
import Portfolio from './Views/Portfolio/Portfolio';

class ViewPort extends Component {
    render() {
        return (
            <div id="app-viewport">
              <Portfolio />
            </div>
        );
    }
}

export default ViewPort;