import * as path from 'path';

import { Config } from '../types';

export function loadConfig(): Config {
  const CONFIG_PATH = path.join(process.cwd(), 'config');
  const config = require(CONFIG_PATH) as Config;

  return config;
}
