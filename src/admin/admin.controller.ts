import { Controller, Get, Headers, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  async getStatisticsData(@Headers('access_token') token: string) {
    const data = this.adminService.getStatisticsData(token);

    return Object.assign({
      data,
      statuCode: 200,
      message: '데이터 조회 성공',
    });
  }

  @Get('/divice/:stuID')
  async getDiviceInfo(@Headers('access_token') token: string, @Param('stuID') stuID : number) {
    const data = await this.adminService.getDiviceInfo(token, stuID);

    return Object.assign({
        data,
        statusCode: 200,
        message: "디바이스 정보 불러오기 성공"
    })
  }
}
