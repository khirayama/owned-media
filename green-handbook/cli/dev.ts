import express from 'express';

import { renderer } from '../src/renderer/renderer';

// eslint-disable-next-line node/no-missing-require, node/no-extraneous-require
const { Resource } = require('publisher');

const PORT = 3000;

const app = express();

Resource.init();

app.use('/', express.static('dist'));

app
  .get('/:locale/resources.json', (req: express.Request, res: express.Response) => {
    const resources = Resource.find(null, { locale: req.params.locale });
    res.json(resources);
  })
  .get('/:locale/resources/:key.json', (req: express.Request, res: express.Response) => {
    const resource = Resource.find({ key: [req.params.key] }, { locale: req.params.locale })[0];
    res.json(resource);
  });

app.get('*', (req: express.Request, res: express.Response) => {
  renderer(req.url).then((fullPageHTML: string) => {
    res.send(fullPageHTML);
  });
});

app.listen(PORT, () => {
  console.log(`Start at http://localhost:${PORT}.`);
});
