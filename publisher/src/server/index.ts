#!/usr/bin/env node
/* eslint-disable no-console, no-process-exit, node/shebang */
import cluster from 'cluster';
import * as os from 'os';
import * as path from 'path';

import { Resource } from '../lib/models/Resource';
import { runServer } from './runServer';

const CONFIG_PATH = path.join(process.cwd(), 'config');
const { config } = require(CONFIG_PATH);

Resource.init();
Resource.defaultLocale = config.locales[0];

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  const numCPUs = os.cpus().length;

  if (cluster.isMaster) {
    [...new Array(numCPUs)].forEach(() => cluster.fork());

    // cluster manager
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Restarting ${worker.process.pid}. ${code || signal}`);
      cluster.fork();
    });
  } else {
    runServer();
  }
} else {
  runServer();
}

process.on('uncaughtException', err => {
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error(err);
});
