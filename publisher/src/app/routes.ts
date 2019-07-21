import * as path from 'path';

import express from 'express';

import * as renderer from './server/renderer';

const STATIC_PATH = path.join(__dirname, '..', 'public');

export const staticRouter = express.static(STATIC_PATH);

export const appRouter: express.Application = express();
appRouter.get('*', renderer.get);
