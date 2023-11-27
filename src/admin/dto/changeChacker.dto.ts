import { IsNumber, IsString } from 'class-validator';

export class ChangeChackerDto {
  @IsNumber()
  grade: number;

  @IsString()
  students: string;

  @IsNumber()
  gender: number;

  @IsString()
  date: string;
}
