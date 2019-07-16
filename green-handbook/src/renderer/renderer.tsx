import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter, matchPath } from 'react-router-dom';
import * as styled from 'styled-components';
import ReactHelmet from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { renderFullPage } from './renderFullPage';
import { reducer } from '../reducers';
import { Routes, routes } from '../presentations/routes/Routes';
import { ResetStyle } from '../presentations/styles/ResetStyle';
import { GlobalStyle } from '../presentations/styles/GlobalStyle';
import { Intl } from '../containers/Intl';

const assets = (() => {
  const entryPoints: string[] = [];

  // eslint-disable-next-line node/no-unpublished-require
  const manifest: { [key: string]: string } = require('../../dist/manifest');
  for (const [key, value] of Object.entries(manifest)) {
    if (/^index|^vendors|^commons/.test(key)) {
      entryPoints.push(value);
    }
  }

  return entryPoints;
})();

const generateParams = (url: string, store: any) => {
  const context = {};
  const preloadedState = store.getState();
  const sheet = new styled.ServerStyleSheet();
  const locale = preloadedState.ui.locale;
  const body = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={url} context={context}>
        <ResetStyle />
        <GlobalStyle />
        <Provider store={store}>
          <Intl>
            <Routes />
          </Intl>
        </Provider>
      </StaticRouter>,
    ),
  );
  const helmetContent = ReactHelmet.renderStatic();
  const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
      ${helmetContent.link.toString()}
    `.trim();
  const style = sheet.getStyleTags();

  return {
    locale,
    meta,
    assets,
    body,
    style,
    preloadedState: JSON.stringify(preloadedState),
  };
};

export const renderer = (location: string): Promise<string> => {
  return new Promise((resolve: (result: string) => void) => {
    const store = createStore(reducer);

    let initializer: any = null;
    let params: any = null;
    for (let i = 0; i < routes.length; i += 1) {
      const route = routes[i];
      const match = matchPath(location, route);
      if (match) {
        initializer = route.initializer;
        params = match.params;
        break;
      }
    }

    if (initializer) {
      store.dispatch(initializer(params)).then(() => {
        resolve(renderFullPage(generateParams(location, store)));
      });
    } else {
      resolve(renderFullPage(generateParams(location, store)));
    }
  });
};
