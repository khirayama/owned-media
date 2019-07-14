import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { StaticRouter } from 'react-router-dom';
import * as styled from 'styled-components';
import ReactHelmet from 'react-helmet';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { renderFullPage, escapeHTML } from './renderFullPage';
import { reducer } from '../reducers';
import { Routes } from '../presentations/routes/Routes';
import { ResetStyle } from '../presentations/styles/ResetStyle';
import { GlobalStyle } from '../presentations/styles/GlobalStyle';
import { Intl } from '../containers/Intl';

const assets = (() => {
  // eslint-disable-next-line node/no-unpublished-require
  const manifest: { [key: string]: string } = require('../../dist/manifest');
  const entryPoints: string[] = [];

  for (const [key, value] of Object.entries(manifest)) {
    if (/^index|^vendors|^commons/.test(key)) {
      entryPoints.push(value);
    }
  }

  return entryPoints;
})();

export const renderer = (location: string) => {
  const context = {};
  const store = createStore(reducer);
  const preloadedState = store.getState();
  const sheet = new styled.ServerStyleSheet();
  const locale = preloadedState.ui.locale;
  const body = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={location} context={context}>
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

  const fullPageHTML = renderFullPage({
    locale,
    meta,
    assets,
    body,
    style,
    preloadedState: JSON.stringify(preloadedState),
  });

  return fullPageHTML;
};
