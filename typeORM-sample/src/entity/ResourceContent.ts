import * as typeorm from "typeorm";

import { SupportLocale } from '../../config';
import { Resource } from './Resource';

@typeorm.Entity('resource_contents')
export class ResourceContent {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column({ type: 'varchar' })
  locale: SupportLocale;

  @typeorm.Column()
  name: string;

  @typeorm.Column()
  body: string;

  @typeorm.ManyToOne(type => Resource, resource => resource.contents)
  resource: Resource;

  @typeorm.CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @typeorm.UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
