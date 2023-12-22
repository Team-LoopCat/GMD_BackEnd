import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class DiviceStatus {
  @PrimaryColumn()
  @OneToOne(() => Student, (student) => student.stuID)
  @JoinColumn({ name: 'stuID' })
  stuID: number;

  @Column({ default: true })
  phone: boolean;

  @Column({ default: true })
  personalLabtop: boolean;

  @Column({ default: true })
  schoolLabtop: boolean;

  @Column({ default: true })
  tablet: boolean;
}
