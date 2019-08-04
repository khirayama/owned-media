import * as path from 'path';

import express from 'express';

import * as renderer from './server/renderer';

const STATIC_PATH = path.join(__dirname, 'public');

export const appRouter: express.Application = express();
appRouter.use('/public', express.static(STATIC_PATH)).get('*', renderer.get);
