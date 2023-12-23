import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Divice } from './entities/divice.entity';
import { DiviceStatus } from './entities/diviceStatus.entity';
import { Student } from './entities/student.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Chacker } from 'src/chacker/entities/chacker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, DiviceStatus, Divice, User, Chacker]),
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
  controllers: [AdminController],
  providers: [UserService, AdminService],
})
export class AdminModule {}
