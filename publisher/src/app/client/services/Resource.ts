import axios from 'axios';

import { ResourceShape, ResourceWithAllLocalesShape, Config } from '../../../types';
import { resourceToRequest } from '../../utils';

const PORT = process.env.PORT || 3000;

const req =
  typeof window === 'object'
    ? axios.create()
    : axios.create({
        baseURL: `http://localhost:${PORT}`,
      });

export class Resource {
  public static baseURL: string = '';

  public static fetchConfig(options?: { locale: string }) {
    return new Promise((resolve: (res: Config) => void) => {
      const locale = options ? options.locale : null;
      const url = `${this.baseURL}/config`;

      req.get(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static fetch(options?: { locale: string }) {
    return new Promise((resolve: (res: (ResourceShape | ResourceWithAllLocalesShape)[]) => void) => {
      const locale = options ? options.locale : null;
      const url = `${this.baseURL}/resources` + (locale ? `?locale=${locale}` : '');

      req.get(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static find(resourceId: string, options?: { locale: string }) {
    const locale = options ? options.locale : null;
    const url = `${this.baseURL}/resources/${resourceId}` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape | ResourceWithAllLocalesShape) => void) => {
      req.get(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static create(resource: ResourceShape, options?: { locale: string }): Promise<ResourceShape> {
    const locale = options ? options.locale : null;
    const url = `${this.baseURL}/resources` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape) => void) => {
      req.post(url, resourceToRequest(resource)).then(res => {
        resolve(res.data);
      });
    });
  }

  public static update(
    resourceId: string,
    resource: ResourceShape,
    options?: { locale: string },
  ): Promise<ResourceShape> {
    const locale = options ? options.locale : null;
    const url = `${this.baseURL}/resources/${resourceId}` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape) => void) => {
      req.put(url, resourceToRequest(resource)).then(res => {
        resolve(res.data);
      });
    });
  }

  public static delete(resourceId: string): Promise<ResourceShape> {
    const url = `${this.baseURL}/resources/${resourceId}`;

    return new Promise((resolve: (res: ResourceShape) => void) => {
      req.delete(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static fetchRelations(resourceId: string, options?: { locale: string }) {
    const locale = options ? options.locale : null;
    const url = `${this.baseURL}/resources/${resourceId}/relations` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: (ResourceShape | ResourceWithAllLocalesShape)[]) => void) => {
      req.get(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static createRelations(resourceId: string, relatedResourceIds: string[]): Promise<any> {
    const url = `${this.baseURL}/resources/${resourceId}/relations?id=${relatedResourceIds.join(',')}`;

    return new Promise((resolve: (res: ResourceShape) => void) => {
      req.post(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static deleteRelations(resourceId: string, relatedResourceIds: string[]): Promise<any> {
    const url = `${this.baseURL}/resources/${resourceId}/relations?id=${relatedResourceIds.join(',')}`;

    return new Promise((resolve: (res: ResourceShape) => void) => {
      req.delete(url).then(res => {
        resolve(res.data);
      });
    });
  }
}
