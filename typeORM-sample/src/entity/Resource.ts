import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { SupportLocale, ResourceType } from '../../config';

@Entity()
export abstract class Resource {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
    default: ResourceType.NOTE,
  })
  type: ResourceType;

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
