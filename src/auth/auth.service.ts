import { Injectable } from "@nestjs/common";
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';
import { PrismaService } from "src/prisma.service";
import { LoginDto, UserDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(private readonly prisma : PrismaService) {}

    async register(data : UserDto): Promise<ReturnResponse> {
        const user = await this.prisma.user.upsert({
            where : {
                email : data.email
            },
            update : {
                ...data
            },
            create : {
                ...data
            }
        })
        return {
            data : user, 
            message : "Register wale ka data hai"
        }
    }

    async login(data : LoginDto) : Promise<ReturnResponse> {
        return {
            data:data,
            message : "Login wala hai ye"
        }
    }
}