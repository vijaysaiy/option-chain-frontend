import "./App.css";
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthMiddleware from './Routes/AuthMiddleware';
import { authRoutes, nonAuthRoutes } from './Routes/routes';

const App = () => {

  const NonAuthMiddleware = ({
    component: Component,
  }) => (
    <Route
      render = {props => {
        return (
            <Component {...props} />
        );
      }}
    />
  );

  return (
    <BrowserRouter>
        <Switch>
            {nonAuthRoutes.map((route, idx) => (
              <NonAuthMiddleware
                path={route.path}
                component={route.component}
                key={idx}
              />
            ))}

            {authRoutes.map((route, idx) => (
              <AuthMiddleware
                path={route.path}
                component={route.component}
                key={idx}
              />
            ))}
        </Switch>
    </BrowserRouter>
  );
}

export default App;
