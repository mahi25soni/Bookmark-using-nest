import { ExtractJwt, Strategy } from 'passport-jwt';
// import {Strategy} from "@nest/passport-local";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // This 
  constructor(private readonly prisma : PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {  // Payload will be in the format you provided in service, with 2 extra fields
    const user = await this.prisma.user.findUnique({
      where : {
        id : payload.user
      }
    })
    delete user.password
    return user //This return will be appended to the user request as req.user. (whatever you return)
  }
}
  