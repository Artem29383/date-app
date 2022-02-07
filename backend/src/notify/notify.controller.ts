import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('notify')
export class NotifyController {
  constructor(private notifyService: NotifyService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // createNotify(@Body() createNotifyDto: CreateNotifyDto) {
  //   return this.notifyService.createNotify(createNotifyDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  getNotify(@GetUser() user: UserEntity) {
    return this.notifyService.getNotify(user);
  }
}
