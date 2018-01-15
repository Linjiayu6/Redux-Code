import { ON_ORDER_DRINK } from '../actions/actionCreator';

const initialState = {
  // 能做10杯咖啡
  coffee: 10,
  // 酒5瓶
  beer: 5,
};

const drinkReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (payload && type === ON_ORDER_DRINK) {
    const { name } = payload;
    return {
      ...state,
      [name]: state[name] - 1,
    };
  }

  return state;
};

export default drinkReducer;
