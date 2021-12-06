import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    console.info('req', req);
    return req.user;
  },
);
