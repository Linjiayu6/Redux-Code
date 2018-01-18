
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
  const currentReducer = reducer; // 改变state的函数
  let currentState = preloadedState; // 初始化传入state的默认值
  console.log('currentState....', currentState);

  const getState = () => currentState;
  const dispatch = (action) => {
    currentState = currentReducer(currentState, action);
    console.warn('dispatch后变更值', currentState);
  };

  return {
    getState,
    dispatch,
  };
};


const store = createStore(combineReducer);
console.log('--------(1)初始化--------', store.getState());

store.dispatch({ type: 'BURGER' });
console.log('--------(2)type类型为BURGER--------', store.getState());

store.dispatch({ type: 'COFFEE' });
console.log('--------(3)type类型为COFFEE--------', store.getState());


/**
 * currentState.... { name: 'ljy' }
    (1) { name: 'ljy' }
    dispatch - currentState { name: 'ljy' }
    (2) { name: 'BURGER' }
    dispatch - currentState { name: 'BURGER' }
    (3) { name: 'COFFEE' }
 */
