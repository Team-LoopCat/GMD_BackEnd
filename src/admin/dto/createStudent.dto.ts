import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  stuID: number;

  @IsString()
  stuName: string;

  @IsNumber()
  gender: number;

  @IsNumber()
  boxID: number;
}
