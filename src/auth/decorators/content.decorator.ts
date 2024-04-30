import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { error } from 'console';

export const ContentValue = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const valueString=request.header('contentId');
    if(!valueString)
    {
        throw new Error (" content Id header is missing")
    }

    const valueId= parseInt(valueString, 10);
    if (isNaN(valueId))
    {
        throw new Error("content Id is not a valid number")
    }
    return valueId;
  },
);
