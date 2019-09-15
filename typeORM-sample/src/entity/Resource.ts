import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';

import { resourceTypes } from '../../config';
import { ResourceContent } from './ResourceContent';
import { ResourceMeta } from './ResourceMeta';
import { ResourceAttribute } from './ResourceAttribute';

const regexpString = resourceTypes.map(resourceType => `^${resourceType.name}$`).join('|');
const regexp = new RegExp(regexpString);

@typeorm.Entity('resources')
export class Resource {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column({ unique: true })
  @classValidator.IsNotEmpty()
  @classValidator.Matches(/^[a-z0-9|-]+$/, { message: 'This resource key($value) is invalid key' })
  key: string;

  @typeorm.Column({ type: 'varchar' })
  @classValidator.IsNotEmpty()
  @classValidator.Matches(regexp, { message: 'This resource type($value) does not be supportted.' })
  type: string;

  @typeorm.OneToMany(() => ResourceContent, resourceContent => resourceContent.resource)
  contents: ResourceContent[];

  @typeorm.OneToMany(() => ResourceMeta, resourceMeta => resourceMeta.resource)
  meta: ResourceMeta[];

  @typeorm.OneToMany(() => ResourceAttribute, resourceAttribute => resourceAttribute.resource)
  attributes: ResourceAttribute[];

  @typeorm.CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
