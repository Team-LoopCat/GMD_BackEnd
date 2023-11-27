import { Body, Controller, Delete, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateDiviceDto } from './dto/updateDivice.dto';
import { CreateStudentDto } from './dto/createStudent.dto';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  async getStatisticsData(@Headers('access_token') token: string) {
    const data = await this.adminService.getStatisticsData(token);

    return Object.assign({
      data,
      statuCode: 200,
      message: '데이터 조회 성공',
    });
  }

  @Get('/divice/:stuID')
  async getDiviceInfo(@Headers('access_token') token: string, @Param('stuID') stuID: number) {
    const data = await this.adminService.getDiviceInfo(token, stuID);

    return Object.assign({
      data,
      statusCode: 200,
      message: '디바이스 정보 불러오기 성공',
    });
  }

  @Patch('/divice/:stuID')
  async updateDivice(@Headers('access_token') token: string, @Param('stuID') stuID: number, @Body() updateDiviceDto: UpdateDiviceDto) {
    this.adminService.updateDivice(token, stuID, updateDiviceDto);

    return Object.assign({
      statusCode: 200,
      message: '디바이스 업데이트',
    });
  }

  @Post('/student/add')
  async createStudent(@Headers('access_token') token: string, @Body() createStudentDto: CreateStudentDto) {
    const data = await this.adminService.addStudent(token, createStudentDto);

    return Object.assign({
      data,
      statusCode: 201,
      message: '학생 추가에 성공했습니다.',
    });
  }

  @Delete('/student/:stuID')
  async deleteStudent(@Headers('access_token') token: string, @Param('stuID') stuID: number) {
    await this.adminService.deleteStudent(token, stuID);

    return Object.assign({
      statusCode: 204,
    });
  }

  @Get('/student/divicestatus/:stuID')
  async getDiviceStatus(@Headers('access_token') token: string, @Param('stuID') stuID: number) {
    const data = await this.adminService.getDiviceStatus(token, stuID);

    return Object.assign({
      data,
      statusCode: 200,
      message: '조회에 성공했습니다',
    });
  }
}
