import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './menu/Index';

const routesList = [
  {
    path: '/',
    component: Index,
  },
];

const AppRouter = () => (
  <Router>
    <div style={{ padding: '20px' }}>
      <h2>智能餐厅菜单</h2>
      <Switch>
        {
          routesList.map(item =>
            (<Route
              key={item.path}
              path={item.path}
              component={item.component}
            />
          ))
        }
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
