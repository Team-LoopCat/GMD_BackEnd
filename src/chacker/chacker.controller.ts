import { Controller, Get, Headers, Param, Patch } from '@nestjs/common';
import { ChackerService } from './chacker.service';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Controller('chack')
export class ChackerController {
  constructor(private readonly chackerService: ChackerService) {}

  @Get('/list/:grade')
  async getBoxList(@Param('grade') grade: number, @Headers('access_token') token: string) {
    const data = await this.chackerService.getBoxList(grade, token);

    return Object.assign({
      data,
      statusCode: 200,
      message: '리스트 조회 성공',
    });
  }

  @Get('/info/:boxID')
  async getBoxInfo(@Param('boxID') boxID: number, @Headers('access_token') token: string) {
    const data = await this.chackerService.getBoxInfo(boxID, token);

    return Object.assign({
      data,
      statusCode: 200,
      message: '박스 조회 성공',
    });
  }

  @Patch('/:boxID')
  async changeStatus(@Param('boxID') boxID: number, @Headers('access_token') token: string, updateStatusDto: UpdateStatusDto) {
    await this.chackerService.changeStatus(boxID, token, updateStatusDto);

    return Object.assign({
      statusCode: 200,
      message: '수정 성공',
    });
  }
}
