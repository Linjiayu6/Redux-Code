
// example_basic.js例子 redux的灵魂
const combineReducer = (state = { name: 1 }, action) => {
  const { type } = action;
  if (type === 'BURGER') {
    return { name: type };
  }
  if (type === 'COFFEE') {
    return { name: type };
  }
  return state;
};

// 函数作用域: JavaScript的函数作用域是指在在函数内声明的所有变量在函数体内始终是可见的
const createStore = (reducer, preloadedState = { name: 'ljy' }) => {
  const currentReducer = reducer; // 改变state的函数
  let currentState = preloadedState; // 初始化传入state的默认值
  console.log('currentState....', currentState);

  const getState = () => currentState;
  const dispatch = (action) => {
    currentState = currentReducer(currentState, action);
    console.log('dispatch后变更值', currentState);
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
