import axios from 'axios';

import { config } from 'config';
import { ResourceShape } from 'lib/types';
import { resourceToRequest } from 'lib/utils';

export class Resource {
  public static create(resource: ResourceShape, options?: { locale: string }): Promise<ResourceShape> {
    const locale = options ? options.locale : null;
    const url = `${config.path.admin}/resources` + locale ? `?locale=${locale}` : '';

    return new Promise((resolve: (res: ResourceShape) => void) => {
      axios.post(url, resourceToRequest(resource)).then(res => {
        resolve(res.data);
      });
    });
  }
}
