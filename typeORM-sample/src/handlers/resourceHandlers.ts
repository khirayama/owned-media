import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import * as express from 'express';

import { resourceTypes } from '../../config';
import { Resource } from '../entity/Resource';

const resourceRepository = typeorm.getRepository(Resource);

export async function createResourceHandler(req: express.Request, res: express.Response) {
  const body = req.body;

  const resource = new Resource();
  resource.key = body.key;
  resource.type = body.type || resourceTypes[0].name;

  const errors = await classValidator.validate(resource);
  if (errors.length) {
    res.status(400).json({
      message: 'Validation Failed',
      errors: errors.map(err => {
        return {
          field: err.constraints,
          // TODO: message
        };
      }),
    });
  } else {
    await resourceRepository.save(resource);
  }

  res.json(resource);
}

export async function updateResourceHandler(req: express.Request, res: express.Response) {
  const resourceId = req.params.id;
  const body = req.body;

  let resource = await resourceRepository.findOne(resourceId);

  if (!resource) {
    return res.status(404).json();
  }

  resource.key = body.key !== undefined ? body.key : resource.key;
  resource.type = body.type !== undefined ? body.type : resource.type;
  // TODO: Update content, attributes, meta

  const errors = await classValidator.validate(resource);
  if (errors.length) {
    res.status(400).json({
      message: 'Validation Failed',
      errors: errors.map(err => {
        return {
          field: err.constraints,
          // TODO: message
        };
      }),
    });
  } else {
    await resourceRepository.save(resource);
  }

  res.json(resource);
}
