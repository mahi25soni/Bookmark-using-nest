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
import { UserService } from "src/user/user.service";
import { ResetDto, ForgetDto} from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authsService : AuthService,
        private readonly userService : UserService) {}

    @Post("register")
    async register(@Body() data:UserDto)  {
        return this.authsService.register(data)
    }

    @Post("login")
    async login(@Body() data : LoginDto) : Promise<ReturnResponse> {
        return this.authsService.login(data)
    }

    @Post('forget_password')
    async forget_password(@Body() data:ForgetDto){
      return await this.userService.forget_password(data);
    }
    @Post('reset_password')
    async reset_password(@Body() data: ResetDto){
      return await this.userService.reset_password(data);
    }

}