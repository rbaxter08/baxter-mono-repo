import * as React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Robinhood from '@Services/Robinhood';

interface props {
  onSignIn?: () => any;
}

class SignInPage extends React.Component<props> {
  state = {
    username: 'wootastic',
    password: '',
    mfa: '',
    needMFA: false,
    mfaCode: '',
  };

  username: string;
  password: string;

  handleSubmit(e: any) {
    e && e.preventDefault();

    if (this.state.needMFA) {
      Robinhood.authorize(this.state.username, this.state.password).then((resp: any) => {
        if (resp && resp.mfa) {
          this.username = resp.username;
          this.password = resp.password;
          this.setState({ needMFA: true });
        } else {
          this.props.onSignIn();
        }
      });
    } else {
      Robinhood.confirmMFA({
        username: this.state.username,
        password: this.state.password,
        ['mfa_code']: this.state.mfaCode,
      }).then(() => {
        this.props.onSignIn();
      });
    }
  }

  render() {
    return (
      <div className="viewport-layout">
        <Form onSubmit={(e: any) => this.handleSubmit(e)}>
          <Input placeholder="Username"
            defaultValue={this.state.username}
            onChange={(e) => {
              this.setState({ username: e.target.value });
            }}>
          </Input>
          <Input placeholder="Password"
            type="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}>
          </Input>
          {
            this.state.needMFA &&
            <Input placeholder="Enter Code"
              defaultValue={this.state.mfa}
              onChange={(e) => {
                this.setState({ mfa: e.target.value });
              }}>
            </Input>
          }
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignInPage;
