import { Body, Controller, Post, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createAcc')
  async signup(@Body() signupDto: CreateUserDto) {
    const data = await this.userService.createAcc(signupDto);

    return Object.assign({
      data,
      statusCode: 201,
      message: '계정 생성에 성공했습니다 (서버 관리자 기능이므로 발견하셨다면 관리자에게 연락 부탁드립니다)',
    });
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.userService.login(loginDto);

    return Object.assign({
      data,
      statusCode: 200,
      message: '로그인 성공',
    });
  }

  @Post('/logout')
  async logout(@Headers('access_token') token: string) {
    await this.userService.logout(token);

    return Object.assign({
      statusCode: 200,
      message: '로그아웃 성공',
    });
  }
}
