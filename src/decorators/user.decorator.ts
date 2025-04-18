import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../module/users/user.schema';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDocument;
  },
);