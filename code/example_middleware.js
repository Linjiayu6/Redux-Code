const { compose } = require('redux');

// example_middleware.js 
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
  console.log('初始化state值: ', currentState);

  const getState = () => currentState;
  const dispatch = (action) => {
    currentState = currentReducer(currentState, action);
  };
  return { getState, dispatch };
};

const store = createStore(combineReducer);

/**
 * 目标: 想在每一次dispatch的时候，打印log
 *   store.dispatch({ type: 'BURGER' });
 * 
 * 问题:
 *   1. 如何将中间件串联起来？ compose
 *   2. 如何保证最后执行dispatch(action)?  最后一个执行dispatch(action)就行了
 *   eg: dispatch(mid2(mid1(action)))
 */
const action = { type: 'BURGER' };
const mid1 = action => { console.log('(1)中间件1', action); return action; }
const mid2 = action => { console.log('(2)中间件2', action); return action; }
const final_dispatch = action => store.dispatch(action);

// 就是这样写：final_dispatch(mid2(mid1(action))

// ******************** 执行I ****************************************
// compose(final_dispatch, mid2, mid1)(action);
// console.log('更新的state: ', store.getState());








// (2) 如何在mid1, mid2中访问store的内容?
// 给每个中间件传入store不就解决了吗
const mid_1 = (store, action) => { console.log('(1) mid1: ', action, store); return action; }
const mid_2 = (store, action) => { console.log('(2) mid2: ', action, store); return action; }

// 但是问题是如果使用compose只能传递单参数. 这样两个参数compose搞不了
// 利用currying概念，大问题拆解处理
const a = store => action => { console.log('(1) mid1_a: ', action, store.getState()); return action; }
const b = store => action => { console.log('(2) mid2_b: ', action, store.getState()); return action; }
const c = store => action => { console.log('(3) dispatch:'), store.dispatch(action); };

// 先利用闭包原理, 将store保存在各个函数中 -> 循环执行处理
// ******************** 执行II ****************************************
const chain = [c, b, a].map(midItem => midItem(store));
// compose(...chain)(action)
// console.log('更新的state: ', store.getState());









// (3) 总有刁民想害朕
const x = store => action => { 
  console.log('(1) mid1_a: ');
  // 不想在最后执行store.dispatch(action), 中间件就执行吧
  // 执行后的结果是: 这一步已经执行了dispatch, 后面的store内容都是不准确的
  store.dispatch(action);
  return action;
}
const y = store => action => { console.log('(2) mid2_b: ', action, store.getState()); return action; }
const z = store => action => { console.log('(3) dispatch: '), store.dispatch(action); };

// 为了避免这种情况出现, 需要给定store.dispatch的权限, 
// 也就是说，只有最后一个执行的函数，才是真正的store.dispatch(action)
// (1) 收回store权限，只给可读state权限. 
// (2) dispatch执行到最后才是调用store.dispatch(action) 给定一个标志，像koa一样，next() 执行下个

/**
 * const a = (store, b, action) => b(store, c, action);
 * const b = (store, c, action) => c(store, dispatch, action);
 * const c = (store, dispatch, action) => dispatch(action);
 * 
 * // 给当前这个函数定义下一个要执行的函数是谁，最后一个执行的是真正的dispatch(action)
 * 
 * const a = store => b => action => b(action);
 * const b = store => c => action => c(action);
 * const c = store => dispatch => action => dispatch(action);
 */








// (1) const chain = [c, b, a].map(midItem => midItem({ getState: store.getState })); 只给读权限
// (2) 如何定义将b,c,dispatch抽象定义
const aa = store => next => action => { console.log('aa', store.getState()); next(action); };
const bb = store => next => action => { console.log('bb', store.getState()); next(action); };
const cc = store => next => action => { console.log('cc', store.getState()); next(action); console.log('cc', store.getState());};

// ******************** 执行III ****************************************
const chain_new = [aa, bb, cc].map(midItem => midItem({ getState: store.getState })); 
// compose处理
const dispath_new = compose(...chain_new)(store.dispatch);
dispath_new(action);
console.log('更新的state: ', store.getState());
