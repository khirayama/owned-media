import * as typeorm from 'typeorm';

import { Resource } from './Resource';

@typeorm.Entity('resource_attributes')
export class ResourceAttribute {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column()
  key: string;

  @typeorm.Column()
  value: string;

  @typeorm.ManyToOne(() => Resource, resource => resource.contents)
  resource: Resource;

  @typeorm.CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
