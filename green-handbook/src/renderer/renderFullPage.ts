type Params = {
  locale: string;
  meta: string;
  assets: Array<string>;
  body: string;
  style: string;
  preloadedState: string;
};

export const escapeHTML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const renderFullPage = ({ locale, meta, assets, body, style, preloadedState }: Params) => {
  return `<!DOCTYPE html>
    <html lang=${locale}>
      <head>
        ${meta}
        ${style}
        ${assets.map(asset => `<script src=${asset} defer></script>`).join('\n')}
      </head>
      <body>
        <div id="root">${body}</div>
        <script id="initial-data" type="text/plain" data-json="${escapeHTML(preloadedState)}"></script>
      </body>
    </html>
  `.trim();
};
