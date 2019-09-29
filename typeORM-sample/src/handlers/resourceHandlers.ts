import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import * as express from 'express';

import { resourceTypes } from '../../config';
import { Resource } from '../entity/Resource';

export async function createResourceHandler(req: express.Request, res: express.Response) {
  const resourceRepository = typeorm.getRepository(Resource);

  const body = req.body;

  const resource = new Resource();
  resource.key = body.key;
  resource.type = body.type || resourceTypes[0].name;

  const errors = await classValidator.validate(resource);
  if (errors.length) {
    return res.status(400).json({
      message: 'Validation Failed',
      errors: errors.map(err => {
        return {
          field: err.property,
          message: Object.keys(err.constraints)
            .map(key => {
              return err.constraints[key];
            })
            .join('. '),
        };
      }),
    });
  } else {
    const result = await resourceRepository.save(resource).catch(err => {
      const errorMessages = {
        key: {
          notUnique: 'SQLITE_CONSTRAINT: UNIQUE constraint failed: resources.key',
        },
      };
      if (err.message === errorMessages.key.notUnique) {
        res.status(400).json({
          message: 'Validation Failed',
          errors: [
            {
              field: 'key',
              message: 'This resource key is already existing.',
            },
          ],
        });
      }
    });
    if (result) {
      return res.status(201).json(resource);
    }
  }
}

export async function updateResourceHandler(req: express.Request, res: express.Response) {
  const resourceRepository = typeorm.getRepository(Resource);

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
          field: err.property,
          message: Object.keys(err.constraints)
            .map(key => {
              return err.constraints[key];
            })
            .join('. '),
        };
      }),
    });
  } else {
    const result = await resourceRepository.save(resource).catch(err => {
      const errorMessages = {
        key: {
          notUnique: 'SQLITE_CONSTRAINT: UNIQUE constraint failed: resources.key',
        },
      };
      if (err.message === errorMessages.key.notUnique) {
        res.status(400).json({
          message: 'Validation Failed',
          errors: [
            {
              field: 'key',
              message: 'This resource key is already existing.',
            },
          ],
        });
      }
    });
    if (result) {
      res.status(200).json(resource);
    }
  }
}

export async function deleteResourceHandler(req: express.Request, res: express.Response) {
  const resourceRepository = typeorm.getRepository(Resource);

  const resourceId = req.params.id;

  let resource = await resourceRepository.findOne(resourceId);

  if (!resource) {
    return res.status(404).json();
  }

  await resourceRepository.delete(resourceId);
  // TODO: Remove related resources
  res.status(204).json();
}
