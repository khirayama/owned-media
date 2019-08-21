import * as typeorm from "typeorm";

import { SupportLocale, ResourceType } from '../../config';

@typeorm.Entity('resources')
export abstract class Resource {

  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column()
  key: string;

  @typeorm.Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.NOTE,
  })
  type: ResourceType;

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
}
