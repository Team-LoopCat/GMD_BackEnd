import { IsNumber, IsString } from 'class-validator';

export class UserPayload {
  @IsNumber()
  userID: number;

  @IsString()
  role: string
}
