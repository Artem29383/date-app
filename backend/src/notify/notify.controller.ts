import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNotifyDto } from './dto/create-notify.dto';

@Controller('notify')
export class NotifyController {
  constructor(private notifyService: NotifyService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // createNotify(@Body() createNotifyDto: CreateNotifyDto) {
  //   return this.notifyService.createNotify(createNotifyDto);
  // }
}
