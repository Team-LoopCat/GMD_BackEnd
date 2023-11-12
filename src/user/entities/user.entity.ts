import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
