#!/usr/bin/env node
/* eslint-disable no-console, no-process-exit, node/shebang */
import { runServer } from './runServer';

runServer();

process.on('uncaughtException', err => {
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.error(err);
});
