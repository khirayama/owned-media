/* eslint-disable no-console, no-process-exit */
import cluster from 'cluster';
import * as os from 'os';

import { Resource } from 'lib/models/Resource';
import { runServer } from 'server/runServer';

import { config } from 'config';

Resource.init();
Resource.defaultLocale = config.locales[0];
Resource.update('4', {
  type: 'note',
  locale: 'en',
  name: 'TEST',
  imageUrl: 'IMAGE PATH',
  attributes: {
    sample: 'SAMPLE',
  },
  page: {
    title: 'TEST TITLE',
    description: 'TEST DESCRIPTION',
    imageUrl: 'IMAGE PATH',
    keywords: 'KEYWORD1,KEYWORD2',
  },
});

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
