import React from 'react';
import WithAuth from '../../containers/WithAuthContainer';
import { Route } from 'react-router-dom';

const RouteWithSubroutes = route => {
  return (
    <Route
      path={route.path}
      render={props =>
        route.auth ? (
          <WithAuth>
            <route.component {...props} routes={route.routes} />
          </WithAuth>
        ) : (
          <route.component {...props} routes={route.routes} />
        )
      }
    />
  );
};

export default RouteWithSubroutes;
