import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entites/student.entity';
import { Repository } from 'typeorm';
import { Divice } from './entites/divice.entity';
import { DiviceStatus } from './entites/diviceStatus.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(DiviceStatus) private diviceStatus: Repository<DiviceStatus>,
    @InjectRepository(Student) private student: Repository<Student>,
    @InjectRepository(Divice) private divice: Repository<Divice>,
    private readonly userService: UserService,
  ) {}

  async getStatisticsData(token: string): Promise<object> {
    const user = await this.userService.validateAccess(token);

    if (user.role != 'admin')
      throw new ForbiddenException('Admin 계정이 아닙니다');
    const userData = await this.student.find();

    const returnData = {
      NotSubSome: 0,
      NotSubAll: 0,
      Confused: 0,
      Allowed: 0,
      OK: 0,
    };

    for (let data of userData) {
      if (data.status == 'NotSubSome') returnData.NotSubSome++;
      if (data.status == 'NotSubAll') returnData.NotSubAll++;
      if (data.status == 'Confused') returnData.Confused++;
      if (data.status == 'Allowed') returnData.Allowed++;
      if (data.status == 'OK') returnData.OK++;
    }

    return returnData;
  }
}
