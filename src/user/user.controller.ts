import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuards } from 'src/auth/guards/auth.guards';
// import { Request } from 'express';


interface CustomRequest extends Request {
    user: any; // Replace 'any' with the appropriate type for your user object
  }

@UseGuards(JwtGuards)
@Controller('user')
export class UserController {
    @Get("first")
    getme(@Request() req) {
        return "first"
    }

    @Get("second")
    second(@Request() req) {
        return "second"
    }

    @Get("third")
    third(@Request() req) {
        return "third"
    }

    @Get("fourth")
    fourth(@Request() req) {
        return "fourth"
    }

}
