import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryColumn()
  genderID: number;

  @Column()
  gender: string;
}
