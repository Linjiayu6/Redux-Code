/**
 * 你可能会问？
 * 1. dispatch是如何和reducer连接到一起的
 */

export const ON_ORDER_DISH = 'ON_ORDER_DISH';
export const ON_ORDER_DRINK = 'ON_ORDER_DRINK';

export const onOrder = ({ dish, drink }) => (dispatch) => {
  if (dish.length !== 0) {
    dish.forEach((dishItem) => {
      dispatch({
        type: ON_ORDER_DISH,
        payload: { name: dishItem },
      });
    });
  }

  if (drink.length !== 0) {
    drink.forEach((drinkItem) => {
      dispatch({
        type: ON_ORDER_DRINK,
        payload: { name: drinkItem },
      });
    });
  }
};
