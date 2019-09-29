// import * as typeorm from 'typeorm';
// import * as classValidator from 'class-validator';
import * as express from 'express';

export async function addResourceContentHandler(req: express.Request, res: express.Response) {
  console.log(req, res);
  res.json(req.params);
}

export async function updateResourceContentHandler(req: express.Request, res: express.Response) {
  console.log(req, res);
  res.json(req.params);
}

export async function deleteResourceContentHandler(req: express.Request, res: express.Response) {
  console.log(req, res);
  res.json(req.params);
}
