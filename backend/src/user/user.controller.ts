import { Controller, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.uploadAvatar(updateUserDto);
  }
}
