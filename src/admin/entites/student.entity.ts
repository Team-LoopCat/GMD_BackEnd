enum SEX {
  male = 'male',
  female = 'female',
}

import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  stuID: number;

  @Column()
  stuName: string;

  @Column()
  status: string;

  @Column({ type: 'enum', enum: SEX })
  gender: string;

  @Column()
  boxNum: number;
}
