import * as path from 'path';

import * as fsExtra from 'fs-extra';

// eslint-disable-next-line node/no-missing-require, node/no-extraneous-require
const { Resource } = require('publisher');
const publisherConfig = require('../config');

Resource.init();

function buildJSON() {
  publisherConfig.locales.forEach((locale: string) => {
    const resources = Resource.find(null, { locale });
    fsExtra.outputFile(path.resolve('dist', 'assets', locale, 'resources.json'), JSON.stringify(resources));
    resources.forEach(resource => {
      fsExtra.outputFile(
        path.resolve('dist', 'assets', locale, 'resources', `${resource.key || resource.id}.json`),
        JSON.stringify(resource),
      );
    });
  });
}

buildJSON();
