import { IsNumber } from 'class-validator';

export class UserPayload {
  @IsNumber()
  userID: number;
}
