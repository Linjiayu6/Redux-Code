import { combineReducers } from 'redux';

import dishReducer from './menu/reducers/dish';
import drinkReducer from './menu/reducers/drink';

// reducers厨师长
const rootReducer = combineReducers({
  dishMaterial: dishReducer,
  drinkMaterial: drinkReducer,
});

export default rootReducer;
