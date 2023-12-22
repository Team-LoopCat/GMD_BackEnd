import { Module } from '@nestjs/common';
import { ChackerController } from './chacker.controller';
import { ChackerService } from './chacker.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/admin/entities/student.entity';
import { DiviceStatus } from 'src/admin/entities/diviceStatus.entity';
import { Chacker } from './entities/chacker.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, DiviceStatus, Chacker, User]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '4h',
      },
      verifyOptions: {
        complete: false,
      },
    }),
  ],
  controllers: [ChackerController],
  providers: [ChackerService, UserService],
})
export class ChackerModule {}
