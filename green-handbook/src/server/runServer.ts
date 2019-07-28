/* eslint-disable no-console, no-process-exit */
import * as http from 'http';

import express from 'express';

import { apiRouter, adminRouter, appRouter, initialize } from 'publisher';

import * as renderer from './renderer';

initialize();

export function runServer() {
  const PORT = process.env.PORT || 3000;
  const app: express.Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== 'production') {
    app.use('/api', adminRouter).use('/ui', appRouter);
  }
  app.use('/api', apiRouter);
  app.use('/public', express.static('dist/public'));
  app.get('*', renderer.get);

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
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

  server.listen(PORT);
}
