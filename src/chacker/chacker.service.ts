import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiviceStatus } from 'src/admin/entities/diviceStatus.entity';
import { Student } from 'src/admin/entities/student.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Injectable()
export class ChackerService {
  constructor(
    @InjectRepository(DiviceStatus) private diviceStatus: Repository<DiviceStatus>,
    @InjectRepository(Student) private student: Repository<Student>,
    private readonly userService: UserService,
  ) {}

  async getBoxList(grade: number, token: string) {
    await this.userService.validateAccess(token);

    const boxs = await this.student.findBy({ grade });

    return boxs;
  }

  async getBoxInfo(boxID: number, token: string): Promise<Object> {
    await this.userService.validateAccess(token);

    const box = await this.student.findOneBy({ boxID });
    const status = await this.diviceStatus.findOneBy({ stuID: box.stuID });

    return { box, status };
  }

  async changeStatus(boxID: number, token: string, updateStatusDto: UpdateStatusDto) {
    const { schoolLabtop, personalLabtop, tablet, phone } = updateStatusDto;

    await this.userService.validateAccess(token);

    const stu = await this.student.findOneBy({ boxID });
    await this.diviceStatus.update({ stuID: stu.stuID }, { schoolLabtop, personalLabtop, tablet, phone });
  }
}
