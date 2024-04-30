import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Auth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth = request.auth;

    return data ? auth?.[data] : auth;
    //return request.Body
  },
);
