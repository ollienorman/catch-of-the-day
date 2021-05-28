import React from 'react';
import {
  TranstionGroup,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  getTotal = (orderIds) =>
    orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

  renderIndividualFish = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 250, exit: 250 },
    };
    if (!fish) return null;
    const isAvailable = fish.status === 'available';
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available!
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 250, exit: 250 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(count * fish.price)}
            <button
              type="button"
              onClick={() => this.props.removeFromOrder(key)}
            >
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = this.getTotal(orderIds);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderIndividualFish)}
        </TransitionGroup>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
