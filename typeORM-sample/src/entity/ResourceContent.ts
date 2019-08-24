import * as typeorm from "typeorm";

import { SupportLocale } from '../../config';
import { Resource } from './Resource';

@typeorm.Entity('resource_contents')
export class ResourceContent {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column({
    type: 'enum',
    enum: SupportLocale,
    default: SupportLocale.jaJP,
  })
  locale: SupportLocale;

  @typeorm.Column()
  name: string;

  @typeorm.Column()
  body: string;

  @typeorm.ManyToOne(type => Resource, resource => resource.contents)
  resource: Resource;
}
