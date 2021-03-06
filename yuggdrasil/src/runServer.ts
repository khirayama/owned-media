/* eslint-disable no-console, no-process-exit */
import * as http from 'http';

import express from 'express';

import { apiRouter, adminRouter, initialize } from './api';
import { appRouter } from './app';

export function runServer() {
  initialize();

  const PORT = process.env.PORT || 3000;
  const app: express.Application = express();

  app.use('/api', apiRouter, adminRouter).use('/ui', appRouter);

  const server = http.createServer(app);

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${(addr || { port: PORT }).port}`;

    console.log(`Listening on ${bind}`);
  });

  server.on('error', (err: any) => {
    if (err.syscall !== 'listen') throw err;

    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw err;
    }
  });

  server.listen(PORT);
}
