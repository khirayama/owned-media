import * as path from 'path';

import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';
import * as express from 'express';
import * as fsExtra from 'fs-extra';

import { supportLocales } from '../../config';
import { Resource } from '../entity/Resource';
import { ResourceContent } from '../entity/ResourceContent';

const ROOT_PATH = path.resolve(process.cwd());

export async function addResourceContentHandler(req: express.Request, res: express.Response) {
  const resourceRepository = typeorm.getRepository(Resource);
  const resourceContentRepository = typeorm.getRepository(ResourceContent);

  const resourceId = req.params.resourceId;
  const body = req.body;

  const resource = await resourceRepository.findOne(resourceId);
  const locale = body.locale || supportLocales[0];

  const bodyFileName = `${resource.key}_${locale}.md`;

  const bodyPath = path.resolve(ROOT_PATH, bodyFileName);
  fsExtra.outputFileSync(bodyPath, body.body);

  const resourceContent = new ResourceContent();
  resourceContent.locale = body.locale || supportLocales[0];
  resourceContent.name = body.name || '';
  resourceContent.body = bodyFileName;
  resource.contents = resource.contents ? [...resource.contents, resourceContent] : [resourceContent];

  const errors = await classValidator.validate(resourceContent);
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
    const resourceContentResult = await resourceContentRepository.save(resourceContent).catch(err => {
      res.status(500).json({
        message: 'Internal Server Error',
        errors: [
          {
            message: err.message,
          },
        ],
      });
    });
    const resourceResult = await resourceRepository.save(resource);
    if (resourceContentResult && resourceResult) {
      resourceContent.body = body.body;
      return res.status(201).json(resourceContent);
    }
  }
}

export async function updateResourceContentHandler(req: express.Request, res: express.Response) {
  console.log(req, res);
  res.json(req.params);
}

export async function deleteResourceContentHandler(req: express.Request, res: express.Response) {
  console.log(req, res);
  res.json(req.params);
}
