import React, { Component } from 'react';

import PortfolioGroup from './PortfolioGroup';

import './main.css';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = { accountBalance: 5000 };
    this.items = [
      {
        name: 'apple',
        targetPercentage: '30',
        currentInvestment: 500,
      },
      {
        name: 'google',
        targetPercentage: '20',
        currentInvestment: 1000,
      },
      {
        name: 'Amazon',
        targetPercentage: '50',
        currentInvestment: 30,
      },
    ];
  }

    render() {
        return (
            <div id="portfolio">
              <div className="portfolio-header">
                {this.state.accountBalance}
              </div>
              <PortfolioGroup name="Tech"
                              targetPercentage={50}
                              groupBalance={3000}
                              items={this.items}
                              accountBalance={this.state.accountBalance}>
              </PortfolioGroup>
            </div>
        );
    }
}

export default Portfolio;