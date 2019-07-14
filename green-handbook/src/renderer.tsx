import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { renderFullPage } from './renderFullPage';

const publisherConfig = require('../config');

const escapeHTML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

const renderer = (config) => {
  const webpack = config.webpack;
  const htmlWebpackPlugin = config.htmlWebpackPlugin;

  const isDebugging = false;
  const debugTag = `
    <h3>webpack config</h3>
    <pre>${escapeHTML(JSON.stringify(webpack, null, 2))}</pre>
    <h3>html-webpack-plugin config</h3>
    <pre>${escapeHTML(JSON.stringify(htmlWebpackPlugin, null, 2))}</pre>
  `;

  return renderFullPage({
    locale: publisherConfig.locales[0],
    meta: '',
    assets: htmlWebpackPlugin.files.js,
    body: '',
    style: '',
    preloadedState: JSON.stringify({}),
    beforeClosingBodyContent: isDebugging ? debugTag : '',
  });
};

export default renderer;
