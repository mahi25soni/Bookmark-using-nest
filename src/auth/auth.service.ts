import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';
import { PrismaService } from "src/prisma.service";
import { LoginDto, UserDto } from "./dto/auth.dto";
import { hash , compare} from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { create } from "domain";

// import bcrypt from 'bcrypt' was not working, and bcrypt.hash was showing problem, but this 
// this not showing any problem
// ASK HARSH
@Injectable()
export class AuthService {
    constructor(
        private readonly prisma : PrismaService , 
        private readonly jwtservice : JwtService 
        ) {}

    async register(data : UserDto): Promise<ReturnResponse> {
        const newpass = await hash(data.password, 10)
        data.password = newpass
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
            data : data, 
            message : "Register wale ka data hai"
        }
    }

    async login(data : LoginDto) : Promise<ReturnResponse> {
        const conto = await this.prisma.user.findUnique({
            where : {
                email : data.email
            }
        })
        const isEqual = await compare(data.password, conto.password)

        if(!isEqual){
            throw new HttpException("Password does not match ", HttpStatus.UNAUTHORIZED)
        }
        else {

            const token = await this.create_token(conto.id, conto.email)
            return {
            data:token,
            message : "Login wala hai ye"
        }}
    }

    async create_token (id : number, email: string): Promise<string> {
        const payload = {
            user : id,
            email : email
        }
        return this.jwtservice.signAsync(payload)

    }
}