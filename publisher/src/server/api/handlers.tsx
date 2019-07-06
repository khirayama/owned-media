import express from 'express';

import { Resource } from './models/Resource';
import { ResourceFullShape, ResourceShape, ResourceRequest } from '../../types';
import { requestToPartialResource } from '../../utils';

export function fetchResources(req: express.Request, res: express.Response) {
  const query = req.query;
  const conditions = {};
  const options = {};

  const conditionWhiteList = ['id', 'type'];
  for (let key of conditionWhiteList) {
    if (query[key]) {
      conditions[key] = query[key].split(',');
    }
  }
  const optionWhiteList = ['locale', 'limit', 'offset', 'sort'];
  for (let key of optionWhiteList) {
    if (options[key]) {
      options[key] = query[key].split(',');
    }
  }

  const resources: ResourceShape[] | ResourceFullShape[] = Resource.find(conditions, options);
  res.json(resources);
}

export function createResource(req: express.Request, res: express.Response) {
  const locale = req.query.locale;
  const resourceRequest: ResourceRequest = req.body;
  const resource: ResourceShape = Resource.create(requestToPartialResource(resourceRequest), {
    locale,
  }) as ResourceShape;

  res.json(resource);
}

export function fetchResource(req: express.Request, res: express.Response) {
  const params = req.params;
  const query = req.query;

  const resource =
    Resource.find(
      { id: params.id },
      { locale: query.locale, limit: Number(query.limit), offset: Number(query.offset) },
    )[0] || null;
  res.json(resource);
}

export function updateResource(req: express.Request, res: express.Response) {
  const locale = req.query.locale;
  const resourceRequest: ResourceRequest = req.body;
  const resourceId = req.params.id;
  const resource: ResourceShape = Resource.update(resourceId, requestToPartialResource(resourceRequest), {
    locale,
  }) as ResourceShape;

  res.json(resource);
}

export function deleteResource(req: express.Request, res: express.Response) {
  const resourceId = req.params.id;
  Resource.delete(resourceId);

  res.json({ status: 'success' });
}
