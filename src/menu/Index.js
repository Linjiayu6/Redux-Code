/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styles from './static/style.css';
import Checkbox from 'antd/lib/checkbox';

const dishList = [
  {
    value: 'burger',
    text: '汉堡包 🍔',
  },
  {
    value: 'frenchfries',
    text: '薯条 🍟',
  },
];

const drinkList = [
  {
    value: 'beer',
    text: '啤酒 🍺',
  },
  {
    value: 'coffee',
    text: '咖啡 ☕️',
  },
];

class Index extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dish: [],
      drink: [],
    };
  }

  onChange(selected, checkedValues) {
    console.log(`${selected}: `, checkedValues);
    this.setState({ [selected]: checkedValues });
  }

  renderDish() {
    return (
      <Checkbox.Group style={{ width: '100%' }} onChange={checkedValues => this.onChange('dish', checkedValues)}>
        <h3>主食</h3>
        {
          dishList.map(({ value, text }) =>
            <div key={value}><Checkbox value={value}>{text}</Checkbox></div>)
        }
      </Checkbox.Group>
    );
  }

  renderDrink() {
    return (
      <Checkbox.Group style={{ width: '100%' }} onChange={checkedValues => this.onChange('drink', checkedValues)}>
        <h3>酒饮</h3>
        {
          drinkList.map(({ value, text }) =>
            <div key={value}><Checkbox value={value}>{text}</Checkbox></div>)
        }
      </Checkbox.Group>
    );
  }

  render() {
    return (
      <div>
        {this.renderDish()}
        {this.renderDrink()}
      </div>
    );
  }
}

// const { func, array, string } = PropTypes;
// Index.propTypes = {

// };

export default connect(state => ({ ...state.menu }), {
  // onOrder,
})(Index);
