import {
  Controller,
  Body,
  Patch,
  Get,
  Query,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FollowUserDto } from './dto/follow-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch('/update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserById(@Query('id') id: string, @GetUser() user: UserEntity) {
    return this.userService.getUserById(id, user);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  getUsers(
    @Query() filterDto: GetUserFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<{ users: UserEntity[]; counts: number }> {
    return this.userService.getUsers(filterDto, user);
  }

  @Post('/follow')
  @UseGuards(JwtAuthGuard)
  follow(@Body() followUserDto: FollowUserDto, @GetUser() user: UserEntity) {
    return this.userService.follow(followUserDto, user);
  }

  @Post('/unfollow')
  @UseGuards(JwtAuthGuard)
  unfollow(
    @Body() unfollowUserDto: FollowUserDto,
    @GetUser() user: UserEntity,
  ) {
    return this.userService.unfollow(unfollowUserDto, user);
  }

  @Get('/followers')
  @UseGuards(JwtAuthGuard)
  getFollowers(@Query('id') id: string) {
    return this.userService.getFollowers(id);
  }
}
