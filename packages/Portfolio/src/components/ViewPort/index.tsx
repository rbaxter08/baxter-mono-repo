import * as React from 'react';
import Portfolio from './Views/Portfolio';
import SignInPage from './Views/SignInPage';

import './main.scss';

class ViewPort extends React.Component {
  state = {
    signedIn: false,
  };

  render() {
    return (
      <div id="viewport">
        {
          this.state.signedIn
            ? <Portfolio />
            : <SignInPage onSignIn={() => this.setState({ signedIn: true })}/>
        }
      </div>
    );
  }
}

export default ViewPort;
