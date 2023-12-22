import { Gender } from 'src/admin/entities/gender.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chacker {
  @PrimaryGeneratedColumn()
  chackerID: number;

  @Column()
  name: string;

  @Column()
  grade: number;

  @Column()
  @OneToOne(() => Gender, (gender) => gender.genderID)
  gender: number;

  @Column()
  date: string;
}
