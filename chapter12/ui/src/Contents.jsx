import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes.js';

// http://localhost:8000/#/report for issue report

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from='/' to='/issues' />
      {routes.map((attrs) => (
        <Route {...attrs} key={attrs.path} />
      ))}
    </Switch>
  );
}
