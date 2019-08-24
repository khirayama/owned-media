import * as typeorm from "typeorm";

import { ResourceType } from '../../config';

@typeorm.Entity('resources')
export class Resource {

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
}
