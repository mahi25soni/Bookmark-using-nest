import { 
    IsEmail,
    IsNotEmpty,
    IsString

 } from 'class-validator';

 export class UserDto {
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    password : string;

 }

 export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    password : string;
 }