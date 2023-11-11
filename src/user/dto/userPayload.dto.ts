import { IsNumber } from 'class-validator';

export class userPayload {
  @IsNumber()
  userID: number;
}
