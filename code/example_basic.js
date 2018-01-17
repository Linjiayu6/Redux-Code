// example_basic.js例子 redux的灵魂
const combineReducer = (state = { name: 1 }, action) => {
  if (action.type === 'BURGER') {
    return { name: action.type };
  }
  if (action.type === 'COFFEE') {
    return { name: action.type };
  }
  return state;
};

const createStore = (reducer, preloadedState = { name: 'ljy' }) => {
  const currentReducer = reducer;
  let currentState = preloadedState;
  console.log('currentState....', currentState);

  const getState = () => currentState;
  const dispatch = (action) => {
    console.log('dispatch - currentState', currentState);
    currentState = currentReducer(currentState, action);
  };

  return {
    getState,
    dispatch,
  };
};


const store = createStore(combineReducer);

console.log('(1)', store.getState());

store.dispatch({ type: 'BURGER' });
console.log('(2)', store.getState());

store.dispatch({ type: 'COFFEE' });
console.log('(3)', store.getState());


/**
 * currentState.... { name: 'ljy' }
    (1) { name: 'ljy' }
    dispatch - currentState { name: 'ljy' }
    (2) { name: 'BURGER' }
    dispatch - currentState { name: 'BURGER' }
    (3) { name: 'COFFEE' }
 */
