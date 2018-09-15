import * as React from 'react';

import './main.scss';

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        {this.props.children}
      </div>
    );
  }
}

class ToolbarSection extends React.Component {
  render() {
    return (
      <div className="toolbar-section">
        {
          React.Children.map(this.props.children, (child) => {
            return <ToolbarItem>{child}</ToolbarItem>;
          })
        }
      </div>
    );
  }
}

class ToolbarItem extends React.Component {
  render() {
    return <div className="toolbar-item">
      {this.props.children}
    </div>;
  }
}

export {
  Toolbar,
  ToolbarSection,
};
