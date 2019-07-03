import axios from 'axios';

import { config } from 'config';
import { ResourceShape } from 'lib/types';
import { resourceToRequest } from 'lib/utils';

export class Resource {
  public static fetch(options?: { locale: string }) {
    return new Promise((resolve: (res: ResourceShape[]) => void) => {
      const locale = options ? options.locale : null;
      const url = `${config.path.api}/resources` + (locale ? `?locale=${locale}` : '');

      axios.get(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static find(resourceId: string, options?: { locale: string }) {
    const locale = options ? options.locale : null;
    const url = `${config.path.api}/resources/${resourceId}` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape) => void) => {
      axios.get(url).then(res => {
        resolve(res.data);
      });
    });
  }

  public static create(resource: ResourceShape, options?: { locale: string }): Promise<ResourceShape> {
    const locale = options ? options.locale : null;
    const url = `${config.path.adminApi}/resources` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape) => void) => {
      axios.post(url, resourceToRequest(resource)).then(res => {
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
    const url = `${config.path.adminApi}/resources/${resourceId}` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape) => void) => {
      axios.put(url, resourceToRequest(resource)).then(res => {
        resolve(res.data);
      });
    });
  }

  public static delete(resource: ResourceShape, options?: { locale: string }): Promise<ResourceShape> {
    const locale = options ? options.locale : null;
    const url = `${config.path.adminApi}/resources` + (locale ? `?locale=${locale}` : '');

    return new Promise((resolve: (res: ResourceShape) => void) => {
      axios.delete(url).then(res => {
        resolve(res.data);
      });
    });
  }
}
