import * as typeorm from 'typeorm';

import { Resource } from './Resource';

@typeorm.Entity('resource_meta')
export class ResourceMeta {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column({
    type: 'varchar',
  })
  locale: string;

  @typeorm.Column()
  title: string;

  @typeorm.Column()
  description: string;

  @typeorm.Column()
  keywords: string;

  @typeorm.ManyToOne(() => Resource, resource => resource.contents)
  resource: Resource;

  @typeorm.CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
