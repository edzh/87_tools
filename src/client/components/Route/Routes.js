import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWithSubroutes from './RouteWithSubroutes';
import routes from './routeConfig';

export default props => {
  return (
    <div className="lg:ml-32 ml-16 p-8 relative z-10">
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubroutes key={route.path} {...route} />
        ))}
      </Switch>
    </div>
  );
};
