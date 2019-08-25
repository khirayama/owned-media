import * as typeorm from "typeorm";

import { ResourceType } from '../../config';
import { ResourceContent } from './ResourceContent';

@typeorm.Entity('resources')
export class Resource {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column()
  key: string;

  @typeorm.Column({ type: 'varchar' })
  type: ResourceType;

  @typeorm.OneToMany(type => ResourceContent, resourceContent => resourceContent.resource)
  contents: ResourceContent[];

  @typeorm.CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @typeorm.UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
