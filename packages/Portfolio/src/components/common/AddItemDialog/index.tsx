import * as React from 'react';
import {
  Form,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';

import './main.scss';

interface props {
  onAdd: (item: any) => any;
  onCancel: () => any;
}

class Sidebar extends React.Component<props> {
  state = {
    selectedTab: 'Portfolio',
    groupName: '',
    companyName: '',
    targetPercent: '',
  };

  onSubmit(e: any, item: any) {
    e.preventDefault();
    item.targetPercentage = this.state.targetPercent;
    item.itemBalance = 0;
    this.props.onAdd(item);
  }

  render() {
    return (
      <Card id="add-item-dialog">
        <CardHeader>
          <Button onClick={() => this.props.onCancel}>X</Button>
        </CardHeader>
        <CardBody>
          <Card>
            <CardHeader>
              Add Equity Item
            </CardHeader>
            <CardBody>
              <Form onSubmit={(e: any) => this.onSubmit(e, {
                name: this.state.companyName,
              })}>
                <Input placeholder="Company Name or Ticker" onChange={(e) => {
                  this.setState({ companyName: e.target.value });
                }}>
                </Input>
                <InputGroup>
                  <Input placeholder="Target Percentage" type="number" onChange={(e) => {
                    this.setState({ targetPercent: e.target.value });
                  }} />
                  <InputGroupAddon addonType="append">%</InputGroupAddon>
                </InputGroup>
                <Button type="submit">Add</Button>
              </Form>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Add Equity Group
            </CardHeader>
            <CardBody>
              <Form onSubmit={(e: any) => this.onSubmit(e, {
                name: this.state.groupName,
              })}>
                <Input placeholder="Group Name" onChange={(e) => {
                  this.setState({ groupName: e.target.value });
                }}>
                </Input>
                <InputGroup>
                  <Input placeholder="Target Percentage" type="number" onChange={(e) => {
                    this.setState({ targetPercent: e.target.value });
                  }} />
                  <InputGroupAddon addonType="append">%</InputGroupAddon>
                </InputGroup>
                <Button type="submit">Add</Button>
              </Form>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    );
  }
}

export default Sidebar;
