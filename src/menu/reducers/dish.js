import { ON_ORDER_DISH } from '../actions/actionCreator';

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
