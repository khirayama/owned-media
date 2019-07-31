import axios from 'axios';

import { Config, ResourceShape, ResourceWithAllLocalesShape } from 'publisher';

const PORT = process.env.PORT || 3000;

const req =
  typeof window === 'object'
    ? axios.create()
    : axios.create({
        baseURL: `http://localhost:${PORT}`,
      });

export class Resource {
  public static baseURL: string = '/api';

  public static fetchConfig() {
    return new Promise((resolve: (res: Config) => void) => {
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

  public static fetchRelations(resourceId: string, options?: { locale: string }) {
    const locale = options ? options.locale : null;
    const url = `${this.baseURL}/resources/${resourceId}/relations` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: (ResourceShape | ResourceWithAllLocalesShape)[]) => void) => {
      req.get(url).then(res => {
        resolve(res.data);
      });
    });
  }
}
