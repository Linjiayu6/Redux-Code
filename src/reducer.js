import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// const reducers = {
//   test1: (state = {}, action) => state,
//   test2: (state = {}, action) => state,
// };

const rootReducer = combineReducers({
  // ...reducers,
  routing: routerReducer,
});

export default rootReducer;
