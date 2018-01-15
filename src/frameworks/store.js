/* eslint no-undef: 0, comma-dangle: 0 */
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// routerReducer 将history和store绑定, 放到store里面
import rootReducer from '../reducer';

const storeEnhancer = compose(applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : compose
);

const store = createStore(rootReducer, {}, storeEnhancer);

// 动态更新state内容, 使用replaceReducer
// if (module.hot) {
//   module.hot.accept('../reducer', () => {
//     /* eslint global-require: 0 */
//     const nextRootReducer = require('../reducer').default;
//     store.replaceReducer(combineReducers(nextRootReducer));
//   });
// }

// subscribe的例子, 每次dispatch一个reducer, 都会触发这个监听器
// store.subscribe(() => {
//   const state = store.getState();
//   console.log(state.kpi);
// });

export default store;
