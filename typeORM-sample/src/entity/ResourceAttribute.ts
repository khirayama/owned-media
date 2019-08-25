import * as typeorm from "typeorm";

import { SupportLocale } from '../../config';
import { Resource } from './Resource';

@typeorm.Entity('resource_attributes')
export class ResourceAttribute {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column()
  key: string;

  @typeorm.Column()
  value: string;

  @typeorm.Column()
  type: string;

  @typeorm.ManyToOne(type => Resource, resource => resource.contents)
  resource: Resource;

  @typeorm.CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @typeorm.UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
