import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { SupportLocale } from '../../config';

@Entity()
export abstract class Label {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column({
    type: 'enum',
    enum: SupportLocale,
    default: SupportLocale.jaJP,
  })
  locale: SupportLocale;

  @Column()
  name: string;

  @Column()
  body: string;
}
