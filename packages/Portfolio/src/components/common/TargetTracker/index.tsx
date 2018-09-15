import * as React from 'react';

import './main.scss';

interface props {
  targetPercentage: number;
  itemBalance: number;
  parentBalance: number;
}

class TargetTracker extends React.Component<props> {
  getCurrentPercentage(current: number, target: number) {
    if (target === 0) {
      return 0;
    }

    return ((current / target) * 100).toFixed(0);
  }

  render() {
    const {
      targetPercentage,
      itemBalance,
      parentBalance,
    } = this.props;

    return (
      <div className="target-tracker">
        <div className="target-tracker-item">
          ({this.getCurrentPercentage(itemBalance, parentBalance)}%)
          <span className="target-tracker-label">current</span>
        </div>
        <div className="divider"></div>
        <div className="target-tracker-item">
          ({targetPercentage}%)
          <span className="target-tracker-label">target</span>
        </div>
      </div>
    );
  }
}

export default TargetTracker;
