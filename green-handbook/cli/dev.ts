import express from 'express';

import { renderer } from '../src/renderer/renderer';

const PORT = 3000;

const app = express();

app.use('/', express.static('dist'));

app.get('*', (req: express.Request, res: express.Response) => {
  renderer(req.url).then((fullPageHTML: string) => {
    res.send(fullPageHTML);
  });
});

app.listen(PORT, () => {
  console.log(`Start at http://localhost:${PORT}.`);
});
