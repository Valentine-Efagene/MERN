import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import template from './template.js';
import Page from '../src/Page.jsx';
import routes from '../src/routes.js';

async function render(req, res) {
  const activeRoute = routes.find((route) => matchPath(req.path, route));

  let initialData;
  if (activeRoute && activeRoute.component.fetchData) {
    initialData = await activeRoute.component.fetchData();
  }

  const element = (
    <StaticRouter location={req.url} context={{}}>
      <Page />
    </StaticRouter>
  );
  const body = ReactDOMServer.renderToString(element);
  res.send(template(body, initialData));
}
export default render;
