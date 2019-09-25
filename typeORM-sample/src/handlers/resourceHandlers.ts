import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import * as express from 'express';

import { resourceTypes } from '../../config';
import { Resource } from '../entity/Resource';

const resourceRepository = typeorm.getRepository(Resource);

export async function createResourceHandler(req: express.Request, res: express.Response) {
  const resource = new Resource();
  resource.key = req.body.key;
  resource.type = req.body.type || resourceTypes[0].name;

  const errors = await classValidator.validate(resource);
  if (errors.length) {
    let messages = [];
    for (const err of errors) {
      messages.push(err.constraints.matches);
    }
    // TODO
    throw new Error(messages.join('\n'));
  } else {
    resourceRepository.save(resource);
  }

  res.json();
}

export async function updateResourceHandler(req: express.Request, res: express.Response) {}
