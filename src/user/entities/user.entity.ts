import { Length } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userID: number;

  @Column({ type: 'varchar', nullable: false })
  @Length(2, 50)
  userName: string;

  @Column({ type: 'varchar', nullable: false })
  @Length(1, 150)
  password: string;

  @Column({ type: 'varchar', nullable: false, default: 'user' })
  @Length(3, 6)
  role: string;
}
