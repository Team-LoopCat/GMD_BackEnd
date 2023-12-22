import { PrimaryColumn, Column, Entity, OneToOne } from 'typeorm';
import { Gender } from './gender.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  stuID: number;

  @Column()
  stuName: string;

  @Column()
  status: string;

  @Column()
  @OneToOne(() => Gender, (gender) => gender.genderID)
  gender: number;

  @Column()
  grade: number;

  @Column()
  boxID: number;
}
