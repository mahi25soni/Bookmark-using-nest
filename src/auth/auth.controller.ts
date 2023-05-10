import { 
    Controller,
    Post,
    Get,
    Body,
    Req
 } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, UserDto } from "./dto/auth.dto";
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';


@Controller('auth')
export class AuthController {
    constructor (private readonly authsService : AuthService) {}

    @Post("register")
    async register(@Req() req : Request)  {
        console.log(req)
        return "nothing"
    }

    @Post("login")
    async login(@Body() data : LoginDto) : Promise<ReturnResponse> {
        return this.authsService.login(data)
    }

}