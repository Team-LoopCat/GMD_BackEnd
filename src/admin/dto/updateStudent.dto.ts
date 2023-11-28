import { IsNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNumber()
  stuID: number;

  @IsString()
  stuName: string;

  @IsNumber()
  boxID: number;
}
