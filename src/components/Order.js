import React from 'react';
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
    if (!fish) return null;
    const isAvailable = fish.status === 'available';
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available!
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = this.getTotal(orderIds);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderIndividualFish)}</ul>
        <div className="total">
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
