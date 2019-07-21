/* eslint-disable @typescript-eslint/camelcase */
import * as path from 'path';

import { Config } from '../../types';

export { resourceWithAllLocalesToResource, requestToPartialResource } from './transformers';
export { extractColumns, csvStringify, csvParse } from './csv';

declare var window: any;

export function loadConfig(): Config {
  let conf;

  if (typeof window === 'object') {
    conf = window.config as Config;
  } else {
    const CONFIG_PATH = path.join(process.cwd(), 'config');
    conf = require(CONFIG_PATH) as Config;
  }

  return conf;
}
