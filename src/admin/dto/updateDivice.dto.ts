import { IsNumber } from "class-validator";

export class UpdateDiviceDto {
  @IsNumber()
  phone: number;

  @IsNumber()
  personalLaptop: number;

  @IsNumber()
  schoolLaptop: number;

  @IsNumber()
  tablet: number;
}