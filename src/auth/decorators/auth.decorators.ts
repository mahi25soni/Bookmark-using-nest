import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // This request is same as the express
    // And request.user have the thing that payload will return
    // Normally request object se bhi yahi hota tha, iss se bhi yahi hoga
    if(data){
      return request.user[data] // If you need the any data of user, then change the function of payload
      // request.user mei wahi aayega joh validate function ka return hoga
    }
  
    return request.user;
  },
);