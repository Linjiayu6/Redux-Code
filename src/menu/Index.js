/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

import { onOrder } from './actions/actionCreator';

const alertDes = [
  '主食和酒水分别有不同的厨师制作',
  '制作一个汉堡包🍔: 需要一片鸡肉+两个蔬菜叶',
  '制作薯条🍟: 需要三个土豆',
  '酒水系列原来均一一对应',
];

const renderAlertDes = () => <div>{
  alertDes.map((item, key) => <div key={key}>({key + 1}) {item}</div>)}</div>;

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
        <Button
          style={{ marginBottom: 30 }}
          type="primary"
          onClick={() => this.onOrder()}
        >
          下单
        </Button>
        <Alert
          message="原材料说明"
          description={renderAlertDes()}
          type="warning"
          showIcon
        />
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
