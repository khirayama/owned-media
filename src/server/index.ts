/* eslint-disable no-console, no-process-exit */
import cluster from 'cluster';
import * as os from 'os';

import { Resource } from 'lib/models/Resource';
import { runServer } from 'server/runServer';

import { config } from 'config';

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
