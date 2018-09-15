import * as React from 'react';

import './main.scss';

class Sidebar extends React.Component {
  state = {
    selectedTab: 'Portfolio',
  };

  render() {
    return (
      <div id="app-sidebar">
        {['Portfolio', 'Item1', 'Item2', 'Item3'].map((item, i) => {
          return (
            <div className={item === this.state.selectedTab ? 'selected-tab' : undefined}
              onClick={() => {
                this.setState({ selectedTab: item });
              }}
              key={i}>{item}
            </div>
          );
        })
        }
      </div>
    );
  }
}

export default Sidebar;
