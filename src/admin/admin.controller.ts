import { Body, Controller, Delete, Get, Head, Headers, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateDiviceDto } from './dto/updateDivice.dto';
import { CreateStudentDto } from './dto/createStudent.dto';
import { ChangeChackerDto } from './dto/changeChacker.dto';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { ChangeStatusDto } from './dto/changeStatus.dto';

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

  @Get('/student/search')
  async searchStudent(@Headers('access_token') token: string, @Query('keyword') keyword: string) {
    const data = await this.adminService.searchStudent(token, keyword);

    return Object.assign({
      data,
      statusCode: 200,
      message: '학생 조회에 성공했습니다',
    });
  }

  @Patch('/student/chacker')
  async changeChacker(@Headers('access_token') token: string, @Body() changeChackerDto: ChangeChackerDto) {
    await this.adminService.changeChacker(token, changeChackerDto);

    return Object.assign({
      statusCode: 200,
      messge: '폰검 변경에 성공했습니다',
    });
  }

  @Get('/student/chacker')
  async getChacker(@Headers('access_token') token: string) {
    const data = await this.adminService.getChackers(token);

    return Object.assign({
      data,
      statusCode: 200,
      message: '폰검학생 조회 성공',
    });
  }

  @Patch('/student/:stuID')
  async updateStudent(@Headers('access_token') token: string, @Param('stuID') stuID: number, @Body() updateStudentDto: UpdateStudentDto) {
    await this.adminService.changeStudentData(token, stuID, updateStudentDto);

    return Object.assign({
      statusCode: 200,
      message: '요청에 성공했습니다.',
    });
  }

  @Get('/student/filter/:filterKey')
  async filterStudent(@Headers('access_token') token: string, @Param('filterKey') filterKey: string) {
    const data = await this.adminService.filterStudent(token, filterKey);

    return Object.assign({
      data,
      statusCode: 200,
      message: '필터링 성공',
    });
  }

  @Patch('/student/divicestatus/:stuID')
  async changeStatus(@Headers('access_token') token: string, @Param('stuID') stuID: number, @Body() changeStatusDto: ChangeStatusDto) {
    await this.adminService.changeStatus(token, stuID, changeStatusDto);

    return Object.assign({
      statusCode: 200,
      message: '학생 상태 변경 성공',
    });
  }
}
