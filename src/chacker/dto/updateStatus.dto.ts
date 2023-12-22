import { IsBoolean } from 'class-validator';

export class UpdateStatusDto {
  @IsBoolean()
  phone: boolean;

  @IsBoolean()
  personalLabtop: boolean;

  @IsBoolean()
  schoolLabtop: boolean;

  @IsBoolean()
  tablet: boolean;
}
