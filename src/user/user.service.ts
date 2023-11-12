import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserPayload } from './dto/userPayload.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    private jwt: JwtService,
  ) {}

  async createAcc(userDto: CreateUserDto): Promise<object> {
    const { userName, password, role } = userDto;

    const user = await this.userEntity.findOneBy({ userName });
    if (user) throw new ConflictException('이미 같은 이름의 계정이 존재함');

    if (role != 'admin' && role != 'user')
      throw new BadRequestException('알수 없는 역할');

    const hashedPW = await bcrypt.hash(password, 10);

    await this.userEntity.save({
      userName,
      password: hashedPW,
      role,
    });

    return {
      userName,
      password: hashedPW,
      role,
    };
  }

  // 로그인
  async login(userDto: LoginDto): Promise<object> {
    const { userName, password } = userDto;

    const user = await this.userEntity.findOneBy({ userName });
    if (!user) throw new NotFoundException('존재하지 않는 유저');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ConflictException('비밀번호 불일치');

    const payload = { userID: user.userID };

    const accessToken = this.createAccess(payload);

    return { accessToken };
  }

  // 로그아웃
  async logout(token: string) {
    const thisUser = this.validateAccess(token);
  }

  // access-token 생성
  async createAccess(userDto: UserPayload): Promise<string> {
    const token = await this.jwt.sign(userDto, {
      secret: process.env.SECRET,
    });
    return token;
  }

  // 토큰 검증
  async validateAccess(token: string): Promise<object> {
    const userData = await this.jwt.verify(token, {
      secret: process.env.SECRET,
    });

    if (!userData) throw new UnauthorizedException('재로그인 필요');
    return userData;
  }
}
