/* eslint import/no-extraneous-dependencies: 0, no-undef: 0, global-require: 0  */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from 'react-hot-loader/lib/AppContainer';

// store, history绑定
// import browserHistory from 'react-router/lib/browserHistory';
// import { syncHistoryWithStore } from 'react-router-redux';

// 组件
import AppRouter from '../AppRouter';
import store from './store';

// const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');
const App = () => {
  ReactDOM.render(
    // <AppContainer store={store} history={history}>,
    <AppContainer>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppContainer>, rootEl,
  );
};

App();
if (module.hot) {
  module.hot.accept();
}
document.addEventListener('DOMContentLoaded', App);
