import { Length } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Stu {
  @PrimaryColumn()
  stuID: number;

  @Column({ type: 'varchar', nullable: false })
  @Length(2, 50)
  stuName: string;

  @Column({ type: 'varchar', nullable: false, default: 'OK' })
  @Length(1, 20)
  status: string;

  @Column({ type: 'varchar', nullable: false })
  @Length(3, 6)
  gender: string;
}
