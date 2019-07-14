import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

const escape = (str: string) => {
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
  const scriptTags = htmlWebpackPlugin.files.js.map((src) => `<script src=${src} defer></script>`);

  const isDebugging = false;
  const debugTag = `
    <h3>webpack config</h3>
    <pre>${escape(JSON.stringify(webpack, null, 2))}</pre>
    <h3>html-webpack-plugin config</h3>
    <pre>${escape(JSON.stringify(htmlWebpackPlugin, null, 2))}</pre>
  `;

  return (`<!DOCTYPE html>
<html>
  <head>
    <title>Page</title>
    ${scriptTags}
  </head>
  <body>
    <div id="page">
      <h1>Page</h1>
      ${isDebugging ? debugTag : ''}
    </div>
  </body>
</html>`);
};

export default renderer;
