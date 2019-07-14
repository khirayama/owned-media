import * as path from 'path';

import * as fsExtra from 'fs-extra';
import { renderer } from '../src/renderer/renderer';

const { Resource } = require('publisher');
const publisherConfig = require('../config');

Resource.init();

// options
// - locale
// - use key
function getEntrypoints(config): string[] {
  const entrypoints: string[] = [];

  const localeUrls: string[] = ['/'];
  if (config.locales.length > 1) {
    for (let i = 0; i < config.locales.length; i += 1) {
      const locale = config.locales[i];
      localeUrls.push(`/${locale}`);
    }
  }

  for (const baseUrl of localeUrls) {
    entrypoints.push(baseUrl);

    for (let j = 0; j < config.resourceTypes.length; j += 1) {
      const resourceType = config.resourceTypes[j];
      entrypoints.push(`${baseUrl === '/' ? '' : baseUrl}/${resourceType.name}`);

      for (let k = 0; k < Resource.rows.resources.length; k += 1) {
        const row = Resource.rows.resources[k];
        if (row.type === resourceType.type) {
          entrypoints.push(`${baseUrl === '/' ? '' : baseUrl}/${resourceType.name}/${row.key || row.id}`);
        }
      }
    }
  }

  return entrypoints.map((entrypoint) => `.${entrypoint === '/' ? '' : entrypoint}/index.html`);
}

function build() {
  getEntrypoints(publisherConfig).forEach((entrypoint) => {
    const location = entrypoint.replace(/^\./, '').replace(/index.html$/, '');
    const fullPageHTML = renderer(location);

    console.log(`Builing ${entrypoint}.`);
    fsExtra.outputFile(path.resolve('dist', entrypoint), fullPageHTML);
  });
}

build();
