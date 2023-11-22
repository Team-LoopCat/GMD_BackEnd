import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class DiviceStatus {
  @PrimaryColumn()
  @OneToOne(() => Student, (student) => student.stuID)
  @JoinColumn({ name: 'stuID' })
  stuID: number;

  @Column({ default: true })
  phone: number;

  @Column({ default: true })
  personalLaptop: number;

  @Column({ default: true })
  schoolLaptop: number;

  @Column({ default: true })
  tablet: number;
}
