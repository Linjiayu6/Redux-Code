import { ON_ORDER_DISH } from '../actions/actionCreator';

/**
 * 你可能会问？
 * 1. 为什么reducer为纯函数？
 * 2. 为什么将不同的reducer分开?
 * 3. dishReducer和drinkReducer分别处理数据, 是如何合并在一起实现数据共享？ redux.combineReducers
 * 4. 如果合并成一个reducer处理, action.type是怎么匹配，并改变值?
 */

const initialState = {
  // 一个汉堡包是一片鸡肉+两个蔬菜叶。 -> 能做10个汉堡
  chicken: 10,
  vegatable: 20,
  // 薯条: 三个土豆。能做1包薯条。 -> 20个薯条
  potato: 60,
};

const dishReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (payload && type === ON_ORDER_DISH) {
    const { name } = payload;
    if (name === 'burger') {
      return {
        ...state,
        chicken: state.chicken - 1,
        vegatable: state.vegatable - 2,
      };
    }

    if (name === 'frenchfries') {
      return {
        ...state,
        potato: state.potato - 3,
      };
    }
  }

  return state;
};

export default dishReducer;
