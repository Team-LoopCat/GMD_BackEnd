import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Like, Repository } from 'typeorm';
import { Divice } from './entities/divice.entity';
import { DiviceStatus } from './entities/diviceStatus.entity';
import { UserService } from 'src/user/user.service';
import { UpdateDiviceDto } from './dto/updateDivice.dto';
import { CreateStudentDto } from './dto/createStudent.dto';
import { ChangeChackerDto } from './dto/changeChacker.dto';
import { Chacker } from 'src/chacker/entities/chacker.entity';
import { UpdateStudentDto } from './dto/updateStudent.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(DiviceStatus) private diviceStatus: Repository<DiviceStatus>,
    @InjectRepository(Student) private student: Repository<Student>,
    @InjectRepository(Divice) private divice: Repository<Divice>,
    @InjectRepository(Chacker) private readonly chacker: Repository<Chacker>,
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
    const { stuID, stuName, gender, boxID } = studentDto;

    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('어드민 계정이 아님');

    const IDStudent = await this.student.findOneBy({ stuID });
    if (IDStudent) throw new ConflictException('이미 같은 학번의 학생이 존재합니다.');

    const boxStudent = await this.student.findOneBy({ stuID });
    if (boxStudent) throw new ConflictException('이미 같은 사물함을 가진 학생이 존재합니다.');

    const newStudent = await this.student.save({
      stuID,
      stuName,
      gender,
    });

    await this.diviceStatus.save({ stuID });
    await this.divice.save({ stuID });

    return newStudent;
  }

  async changeStudentData(token: string, stuID: number, studentDto: UpdateStudentDto) {
    const { stuName, boxID } = studentDto;

    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('admin이 아님');

    const thisStudent = await this.student.findOneBy({ stuID });
    if (!thisStudent) throw new NotFoundException('유저를 찾을 수 없음');

    await this.student.update(stuID, { stuName, boxID });
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

  async getDiviceStatus(token: string, stuID: number): Promise<object> {
    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('admin이 아님');
    const thisDiviceStatus = await this.diviceStatus.findOneBy({ stuID });
    if (!thisDiviceStatus) throw new NotFoundException('존재하지 않는 학생');

    return thisDiviceStatus;
  }

  async searchStudent(token: string, keyword: string): Promise<object> {
    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('admin이 아님');

    // 사물함 번호일 시
    if (Number(keyword)) {
      return await this.student.find({ where: { boxID: Number(keyword) } });
    }
    // 학생 이름일시
    else {
      return await this.student.find({ where: { stuName: Like(`%${keyword}%`) } });
    }
  }

  async changeChacker(token: string, chakerDto: ChangeChackerDto) {
    const { grade, students, gender, date } = chakerDto;

    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('admin이 아님');

    if (grade > 3 || grade < 1) throw new BadRequestException('학년 정보가 잘못되었습니다.');

    const studentsData = students.split(',').filter((student) => student.length > 0);
    while (studentsData.length < 2) studentsData.push('지정되지 않음'); // 2명 이하라면 '지정되지 않음' 채우기

    const chakers = await this.chacker.find({ where: { grade, gender, date } });
    await this.chacker.update({ chackerID: chakers[0].chackerID }, { name: studentsData[0] });
    await this.chacker.update({ chackerID: chakers[1].chackerID }, { name: studentsData[1] });
  }

  async getChackers(token: string) {
    const user = await this.userService.validateAccess(token);
    if (user.role != 'admin') throw new ForbiddenException('admin이 아님');

    const today = new Date().getDay();

    // 월 ~ 목, 일요일일 경우
    if (today < 5 || today == 7) {
      return await this.chacker.find({ where: { date: 'weekday' } });
    }
    // 금 ~ 토요일인 경우
    else {
      return await this.chacker.find({ where: { date: 'weekend' } });
    }
  }
}
