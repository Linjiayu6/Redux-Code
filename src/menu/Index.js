/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';

import { onOrder } from './actions/actionCreator';

// import styles from './static/style.css';
const menu = {
  dish: [
    {
      value: 'burger',
      text: '汉堡包 🍔',
    },
    {
      value: 'frenchfries',
      text: '薯条 🍟',
    },
  ],
  drink: [
    {
      value: 'beer',
      text: '啤酒 🍺',
    },
    {
      value: 'coffee',
      text: '咖啡 ☕️',
    },
  ],
};

class Index extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dishSelect: [],
      drinkSelect: [],
    };
  }

  onChange(selected, checkedValues) {
    console.log(`${selected}: `, checkedValues);
    this.setState({ [`${selected}Select`]: checkedValues });
  }

  onOrder() {
    const { dishSelect, drinkSelect } = this.state;
    this.props.onOrder({ dish: dishSelect, drink: drinkSelect });
    // 下单后，清空备选项
    this.setState({ dishSelect: [], drinkSelect: [] });
  }

  renderItem(name) {
    const remainFoodList = this.props[name];
    const list = this.state[`${name}Select`];
    const titles = { drink: '酒水', dish: '主食' };

    return (
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={checkedValues => this.onChange(name, checkedValues)}
        value={list}
      >
        <h3 style={{ margin: '10px' }}>{titles[name]}</h3>
        {
          menu[name].map(({ value, text }, key) => {
            const remainNum = remainFoodList[value];
            return (
              <div key={key}>
                <Checkbox
                  value={value}
                  disabled={remainNum === 0}
                >
                  {text}
                </Checkbox>
                <p>{remainNum === 0 ? '*已售罄' : `剩余: ${remainNum}`}</p>
              </div>
            );
          })
        }
      </Checkbox.Group>
    );
  }

  render() {
    return (
      <div>
        {['dish', 'drink'].map(name => <div key={name}>{this.renderItem(name)}</div>)}
        <Button type="primary" onClick={() => this.onOrder()}>下单</Button>
      </div>
    );
  }
}

const { func } = PropTypes;
Index.propTypes = {
  onOrder: func,
};

export default connect((state) => {
  const { dishMaterial, drinkMaterial } = state;
  const { potato, chicken } = dishMaterial;
  // 展示可做的剩余数量
  return {
    dish: {
      frenchfries: potato / 3,
      burger: chicken,
    },
    drink: drinkMaterial,
  };
}, {
  onOrder,
})(Index);
