import { Module } from '@nestjs/common';
import { ReplayService } from './replay.service';

@Module({
  providers: [ReplayService]
})
export class ReplayModule {}
