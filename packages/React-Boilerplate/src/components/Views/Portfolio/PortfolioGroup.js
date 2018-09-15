import React, { Component } from 'react';

import {
  Button,
  Card,
  Collapse,
  CardTitle,
  CardBody } from 'reactstrap';

class PortfolioGroup extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  getCurrentPercentage(current, target) {
    return ((current / target) * 100).toFixed(0);
  }

  renderGroupItem(item, key) {
    return (
      <Card key={key} className="portfolio-group-item">
        <CardTitle className="portfolio-group-header">
          <span>{item.name}</span>
          <span>{this.getCurrentPercentage(item.currentInvestment, this.props.groupBalance)}% | {item.targetPercentage}% (current | target)</span>
        </CardTitle>
      </Card>
    );
  }

  render() {
    const {
      name,
      targetPercentage,
      accountBalance,
      groupBalance,
      items,
    } = this.props;

    return (
      <div className="portfolio-group">
        <Card>
          <CardTitle className="portfolio-group-header">
            <Button outline size="sm" onClick={() => this.toggle()}>+</Button>
            <span>{name}</span>
            <span>{this.getCurrentPercentage(groupBalance, accountBalance)}% | {targetPercentage}% (current | target)</span>
          </CardTitle>
          <Collapse isOpen={this.state.isOpen}>
            <CardBody>
              {items && items.map((groupItem, key) => {
                return this.renderGroupItem(groupItem, key);
              })}
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default PortfolioGroup;