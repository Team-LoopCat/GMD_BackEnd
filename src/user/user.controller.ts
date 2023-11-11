import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {

  }

  @Post('/login')
  async logout(@Headers('access_token') token : string) {
    
  }
}
