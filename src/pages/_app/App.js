import React, { Suspense, lazy } from 'react';

import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import '../../tailwind.css';
// Home
const HomePage = lazy(() => import('../home/HomePage'));
const NoRouteMatchPage = lazy(() => import('./NoRouteMatchPage'));

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          {/* Home  */}
          <Route exact path="/">
            <HomePage />
          </Route>

          {/* 404 */}
          <Route>
            <NoRouteMatchPage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
