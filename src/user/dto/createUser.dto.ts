import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  password: String;

  @IsString()
  role: string;
}
