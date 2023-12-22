import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserPayload } from './dto/userPayload.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(User) private userEntity: Repository<User>,
    private jwt: JwtService,
  ) {}

  // 유저 생성 (관리자 전용)
  async createAcc(userDto: CreateUserDto): Promise<object> {
    const { userName, password, role } = userDto;

    const user = await this.userEntity.findOneBy({ userName });
    if (user) throw new ConflictException('이미 같은 이름의 계정이 존재함');

    if (role != 'admin' && role != 'user') throw new BadRequestException('알수 없는 역할');

    const hashedPW = await bcrypt.hash(password, 10);

    const newUser = await this.userEntity.save({
      userName,
      password: hashedPW,
      role,
    });

    return newUser;
  }

  // 로그인
  async login(userDto: LoginDto): Promise<object> {
    const { userName, password } = userDto;

    const user = await this.userEntity.findOneBy({ userName });
    if (!user) throw new NotFoundException('존재하지 않는 유저');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ConflictException('비밀번호 불일치');

    const payload = { userID: user.userID, role: user.role };

    const accessToken = await this.createAccess(payload);

    return { accessToken };
  }

  // 로그아웃
  async logout(token: string) {
    await this.validateAccess(token);
  }

  // access-token 생성
  async createAccess(userDto: UserPayload): Promise<string> {
    const accessToken = await this.jwt.sign(userDto, {
      secret: process.env.SECRET,
    });

    return accessToken;
  }

  // 토큰 검증
  async validateAccess(token: string): Promise<UserPayload> {
    token = token.split(' ')[1];

    const userData = await this.jwt.verify(token, {
      secret: process.env.SECRET,
    });

    if (!userData) throw new UnauthorizedException('재로그인 필요');
    return userData;
  }
}
