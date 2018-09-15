import * as React from 'react';
import { FaPlus, FaCog, FaTrash } from 'react-icons/fa';

import {
  Button,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  InputGroup,
  Input,
  Form,
  InputGroupText,
  Modal,
  ModalBody,
} from 'reactstrap';

import TargetTracker from '@Common/TargetTracker';
import { Toolbar, ToolbarSection } from '@Common/Toolbar';
import './main.scss';

interface props {
  onRemove?: () => any;
  name: string;
  subItems: any[];
  targetPercentage: number;
  itemBalance: number;
  parentBalance: number;
  id: string;
  onPercentageChange: any;
}

class PortfolioGroup extends React.Component<props> {
  state = {
    isOpen: false,
    isSettingOpen: false,
    isModalOpen: false,
    percentValue: 0,
  };

  getCurrentPercentage(current: number, target: number) {
    return ((current / target) * 100).toFixed(0);
  }

  formatPercentage(e: any) {
    const percent = parseFloat(e.target.value);
    if (percent && percent >= 0 && percent <= 100) {
      return percent;
    }

    if (!percent) {
      return 0;
    }

    return this.props.targetPercentage;
  }

  render(): any {
    const {
      name,
      subItems,
      targetPercentage,
      itemBalance,
      parentBalance,
    } = this.props;

    const hasChildren = subItems && !!subItems.length;

    return (<div className="portfolio-group">
      <Modal isOpen={this.state.isModalOpen}>
        <ModalBody>
          <Form id="item-input" onSubmit={(e) => {
            e.preventDefault();
            this.setState({ isModalOpen: false });
            this.props.onPercentageChange(this.state.percentValue, this.props.id);
          }}>
            <InputGroup>
              <Input placeholder="100"
                id="percent-input"
                type="number"
                value={this.state.percentValue}
                onChange={(e) => {
                  const value = this.formatPercentage(e);
                  this.setState({ percentValue: value });
                }} />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Toolbar>
        <ToolbarSection>
          {
            hasChildren &&
            <Button onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
              <FaPlus />
            </Button>
          }
          <span className="toolbar-title">{name}</span>
        </ToolbarSection>
        <ToolbarSection>
          <TargetTracker targetPercentage={targetPercentage}
            itemBalance={itemBalance}
            parentBalance={parentBalance}>
          </TargetTracker>
          <ButtonDropdown isOpen={this.state.isSettingOpen} toggle={() => {
            this.setState({ isSettingOpen: !this.state.isSettingOpen });
          }}>
            <DropdownToggle>
              <FaCog />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => this.props.onRemove()}>
                <FaTrash className="drop-down-icon" />
                Delete
              </DropdownItem>
              <DropdownItem onClick={() => this.setState({ isModalOpen: true })}>
                Edit Target %
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ToolbarSection>
      </Toolbar>
      {
        hasChildren && (
          <Collapse isOpen={this.state.isOpen}>
            {subItems.map((subItem, key) => (
              <PortfolioGroup name={subItem.name}
                key={key}
                subItems={subItem.subItems}
                targetPercentage={subItem.targetPercentage}
                itemBalance={subItem.itemBalance}
                parentBalance={itemBalance}
                id={subItem.id}
                onPercentageChange={this.props.onPercentageChange}>
              </PortfolioGroup>))
            }
          </Collapse>)
      }
    </div>);
  }
}

export default PortfolioGroup;
