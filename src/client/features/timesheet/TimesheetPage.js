import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimesheetHeader from './TimesheetHeader';
import RouteWithSubroutes from 'client/components/Route/RouteWithSubroutes';

export default function TimesheetPage({ routes, match }) {
  const timesheetId = match.params.id;

  return (
    <div>
      <TimesheetHeader timesheetId={timesheetId} />
      {routes.map(route => (
        <RouteWithSubroutes key={route.path} {...route} />
      ))}
    </div>
  );
}
