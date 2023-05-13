import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuards } from 'src/auth/guards/auth.guards';
import { User } from 'src/auth/decorators/auth.decorators';
import { UserDto } from 'src/auth/dto/auth.dto';


interface CustomRequest extends Request {
    user: any; // Replace 'any' with the appropriate type for your user object
  }

@UseGuards(JwtGuards)
@Controller('user')
export class UserController {
    @Get("first")
    getme(@User() user: any) { // If you don't provide any field, then it will return entire user, but provide specific field to get specific data
        console.log(user)
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
