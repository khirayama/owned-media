import { ResourceRequest, ResourceShape } from '../types';

export function requestToPartialResource(req: ResourceRequest): Partial<ResourceShape> {
  return {
    // id: '',
    type: req.type,
    key: req.key,
    // body: '',
    contents: req.contents,
    attributes: req.attributes,
    // createdAt: '',
    // updatedAt: '',
  };
}
