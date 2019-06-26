import express from 'express';

import { Resource } from 'lib/Resource';

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

  const resources = Resource.find(conditions, options);
  res.json(resources);
}

export function createResource(req: express.Request, res: express.Response) {
  const locale = req.query.locale;
  const resource = req.body.resource;

  const relationIds = req.body.relationIds;
  const now = new Date();

  resource.locale = resource.locale || locale;

  Resource.create(resource);

  // TODO: Create relations

  res.json({
    now,
    resource,
    relationIds,
  });
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
  const resourceId = req.params.id;
  const resource = req.body.resource;

  Resource.update(resource.id, resource);

  res.json({ a: 2 });
}

export function deleteResource(req: express.Request, res: express.Response) {
  res.json({ a: 2 });
}
