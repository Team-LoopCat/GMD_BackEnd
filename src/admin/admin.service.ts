import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Divice } from './entities/divice.entity';
import { DiviceStatus } from './entities/diviceStatus.entity';
import { UserService } from 'src/user/user.service';
import { UpdateDiviceDto } from './dto/updateDivice.dto';
import { CreateStudentDto } from './dto/createStudentDto';

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

    if (user.role != 'admin') throw new ForbiddenException('Admin 계정이 아닙니다');
    const stuData = await this.student.find();

    const returnData = {
      NotSubSome: 0,
      NotSubAll: 0,
      Confused: 0,
      Allowed: 0,
      OK: 0,
    };

    for (let data of stuData) {
      if (data.status == 'NotSubSome') returnData.NotSubSome++;
      if (data.status == 'NotSubAll') returnData.NotSubAll++;
      if (data.status == 'Confused') returnData.Confused++;
      if (data.status == 'Allowed') returnData.Allowed++;
      if (data.status == 'OK') returnData.OK++;
    }

    return returnData;
  }

  async getDiviceInfo(token: string, stuID: number): Promise<object> {
    const userData = await this.userService.validateAccess(token);
    if (userData.role != 'admin') throw new ForbiddenException('Admin이 아님');
    const diviceStatus = await this.divice.findOneBy({ stuID });
    if (!diviceStatus) throw new NotFoundException('존재하지 않는 학생');

    return diviceStatus;
  }

  async updateDivice(token: string, stuID: number, updateDiviceDto: UpdateDiviceDto) {
    const { phone, schoolLaptop, personalLaptop, tablet } = updateDiviceDto;

    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('어드민 계정이 아님');

    await this.divice.update(stuID, {
      phone,
      schoolLaptop,
      personalLaptop,
      tablet,
    });
  }

  async addStudent(token: string, studentDto: CreateStudentDto): Promise<object> {
    const { stuID, stuName, gender } = studentDto;

    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('어드민 계정이 아님');

    const thisStudent = await this.student.findOneBy({ stuID });
    if (thisStudent) throw new ConflictException('이미 같은 학번의 학생이 존재합니다.');

    const newStudent = await this.student.save({
      stuID,
      stuName,
      gender,
    });

    await this.diviceStatus.save({ stuID });
    await this.divice.save({ stuID });

    return newStudent;
  }

  async deleteStudent(token: string, stuID: number) {
    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('Admin이 아님');

    const thisStudent = await this.student.findOneBy({ stuID });
    if (!thisStudent) throw new NotFoundException('존재하지 않는 학생');

    await this.divice.delete({ stuID });
    await this.diviceStatus.delete({ stuID });
    await this.student.delete({ stuID });
  }
}
