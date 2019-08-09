import express from 'express';

import { Resource } from './models/Resource';
import { ResourceShape, ResourceRequest } from './types';
import { requestToPartialResource, loadConfig } from './utils';

const config = loadConfig();

export function fetchConfig(req: express.Request, res: express.Response) {
  res.json(config);
}

export function fetchResources(req: express.Request, res: express.Response) {
  const query = req.query;
  const conditions = {};

  const conditionWhiteList = ['id', 'type'];
  for (let key of conditionWhiteList) {
    if (query[key]) {
      conditions[key] = query[key].split(',');
    }
  }
  const options = { locale: query.locale, limit: Number(query.limit), offset: Number(query.offset), sort: query.sort };

  const resources: ResourceShape[] = Resource.find(conditions, options);
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

  const options = {
    locale: query.locale,
    limit: query.limit ? Number(query.limit) : query.limit,
    offset: query.offset ? Number(query.offset) : query.offset,
    sort: query.sort,
  };
  const resource =
    Resource.find({ id: [params.id] }, options)[0] || Resource.find({ key: [params.id] }, options)[0] || null;
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

export function fetchRelatedResources(req: express.Request, res: express.Response) {
  const params = req.params;
  const query = req.query;

  const options = { locale: query.locale, limit: Number(query.limit), offset: Number(query.offset), sort: query.sort };
  const resources = Resource.find({ id: Resource.relation([params.id]) }, options);
  res.json(resources);
}

export function createRelations(req: express.Request, res: express.Response) {
  const query = req.query;
  const resourceId = req.params.id;
  const relatedResourceIds = query.id.split(',');

  Resource.createRelations(resourceId, relatedResourceIds);

  res.json(query);
}

export function deleteRelations(req: express.Request, res: express.Response) {
  const query = req.query;
  const resourceId = req.params.id;
  const relatedResourceIds = query.id.split(',');

  Resource.deleteRelations(resourceId, relatedResourceIds);

  res.json(query);
}

export function fetchTargetCountries(req: express.Request, res: express.Response) {
  const resourceId = req.params.id;

  const countryCodes: string[] = Resource.findTargetCountries(resourceId);

  res.json({ countryCodes });
}

export function createTargetCountries(req: express.Request, res: express.Response) {
  const query = req.query;
  const resourceId = req.params.id;
  const countryCodes = query.country_codes.split(',');

  Resource.createTargetCountries(resourceId, countryCodes);

  res.json(query);
}

export function deleteTargetCountries(req: express.Request, res: express.Response) {
  const query = req.query;
  const resourceId = req.params.id;
  const countryCodes = query.country_codes.split(',');

  Resource.deleteTargetCountries(resourceId, countryCodes);

  res.json(query);
}

export function fetchExceptedCountries(req: express.Request, res: express.Response) {
  const resourceId = req.params.id;

  const countryCodes: string[] = Resource.findExceptedCountries(resourceId);

  res.json({ countryCodes });
}

export function createExceptedCountries(req: express.Request, res: express.Response) {
  const query = req.query;
  const resourceId = req.params.id;
  const countryCodes = query.country_codes.split(',');

  Resource.createTargetCountries(resourceId, countryCodes);

  res.json(query);
}

export function deleteExceptedCountries(req: express.Request, res: express.Response) {
  const query = req.query;
  const resourceId = req.params.id;
  const countryCodes = query.country_codes.split(',');

  Resource.deleteExceptedCountries(resourceId, countryCodes);

  res.json(query);
}
