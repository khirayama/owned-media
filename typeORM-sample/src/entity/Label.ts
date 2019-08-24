import * as typeorm from "typeorm";

import { SupportLocale } from '../../config';

@typeorm.Entity('labels')
export abstract class Label {

  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column()
  key: string;

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