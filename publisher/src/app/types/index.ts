import { ResourceWithAllLocalesShape, ResourceShape } from '../../api';

export type ResourceShapeWithRelations = ResourceShape & {
  relations: string[];
};

export type ResourceWithAllLocalesShapeWithRelations = ResourceWithAllLocalesShape & {
  relations: string[];
};
