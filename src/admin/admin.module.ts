import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Divice } from './entities/divice.entity';
import { DiviceStatus } from './entities/diviceStatus.entity';
import { Student } from './entities/student.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Chacker } from 'src/chacker/entities/chacker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, DiviceStatus, Divice, User, Chacker])],
  controllers: [AdminController],
  providers: [UserService, AdminService],
})
export class AdminModule {}
