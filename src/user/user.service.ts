import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResetDto, ForgetDto} from './dto/user.dto';
import { hash , compare} from 'bcrypt';
import { ReturnResponse } from 'src/common/interfaces/response.interfaces';
import { LoginDto, UserDto } from "src/auth/dto/auth.dto";


@Injectable()
export class UserService {

    constructor(private readonly prisma : PrismaService) {}

    async reset_password (data : ResetDto): Promise<ReturnResponse>{
        const getUser = await this.prisma.user.findFirst({
          where : {
            email: data.email
          },
        });
    
        if (!getUser) {
          throw new HttpException("Incorrect EmailID", HttpStatus.NOT_FOUND)
        }
     
        const isMatch = await compare(data.old_password , getUser.password)
        if(!isMatch){
          throw new HttpException("Incorrect Old Password", HttpStatus.UNAUTHORIZED)
        }
    
        const newpassword = await hash(data.new_password, 10)
        const updated = await this.prisma.user.update({
          where : {
            id : getUser.id,
          },
            data : {
              password : newpassword,
            }
          }
        )
        return {
          data: updated,
          message: 'Update Successful',
        };
      }
    
    
      async forget_password (data : ForgetDto) : Promise<ReturnResponse> {
        const getUser = await this.prisma.user.findUnique({
          where : {
            email: data.email
          },
        });
    
        if (!getUser) {
          throw new HttpException("Incorrect EmailID", HttpStatus.NOT_FOUND)
        }
    
        const newpassword = await hash(data.password, 10)
        
        const chnaged = await this.prisma.user.update({
          where : {
            id : getUser.id,
          },
            data : {
              password : newpassword,
            }
          }
        )
        return {
          data: chnaged,
          message: 'Password change successful',
        };
      }
}
