import * as typeorm from 'typeorm';

import { ResourceContent } from './ResourceContent';
import { ResourceMeta } from './ResourceMeta';
import { ResourceAttribute } from './ResourceAttribute';

@typeorm.Entity('resources')
export class Resource {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column({ unique: true })
  key: string;

  @typeorm.Column({ type: 'varchar' })
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
