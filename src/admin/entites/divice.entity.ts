import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Divice {
  @PrimaryColumn()
  @OneToOne(() => Student, (student) => student.stuID)
  @JoinColumn({name: 'stuID'})
  stuID: number;

  @Column({default: 1})
  phone: number;

  @Column({default: 0})
  personalLaptop: number;

  @Column({default: 1})
  schoolLaptop: number;

  @Column({default: 0})
  tablet: number;
}
