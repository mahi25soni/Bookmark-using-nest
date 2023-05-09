import { 
    Controller,
    Post,
    Get,
    Body
 } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, UserDto } from "./dto/auth.dto";
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';


@Controller('auth')
export class AuthController {
    constructor (private readonly authsService : AuthService) {}

    @Post("register")
    async register(@Body() data : UserDto) : Promise<ReturnResponse> {
        return this.authsService.register(data)
    }

    @Post("login")
    async login(@Body() data : LoginDto) : Promise<ReturnResponse> {
        return this.authsService.login(data)
    }

    ///User ka login aur token rahega auth mei
    // User ka sign up, forget password, aur reset password rahega, user service mei.
    //login wala thoda sahi se banaunga, baaki forget aur reset toh abhi banaye thhe toh uspei time waste nahi krunga 
    // PRISMA SERVICE kese aur kya work krti hai ye bhi smjhna pdega
    /// aur ye ... ka kya scene hai smjhna padega
}