import * as typeorm from "typeorm";

import { resourceTypes } from '../../config';
import { ResourceContent } from './ResourceContent';
import { ResourceMeta } from './ResourceMeta';
import { ResourceAttribute } from './ResourceAttribute';

const resourceTypeNames = resourceTypes.map((resourceType) => resourceType.name);

@typeorm.Entity('resources')
export class Resource {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column()
  key: string;

  @typeorm.Column({
    type: 'varchar',
    enum: resourceTypeNames,
    default: resourceTypeNames[0],
  })
  type: string;

  @typeorm.OneToMany(type => ResourceContent, resourceContent => resourceContent.resource)
  contents: ResourceContent[];

  @typeorm.OneToMany(type => ResourceMeta, resourceMeta => resourceMeta.resource)
  meta: ResourceMeta[];

  @typeorm.OneToMany(type => ResourceAttribute, resourceAttribute => resourceAttribute.resource)
  attributes: ResourceAttribute[];

  @typeorm.CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @typeorm.UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
