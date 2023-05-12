import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export enum TYPE {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    UNIVERSITY = 'UNIVERSITY',
    COMPANY = 'COMPANY',
  }
  
  export class ResetDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    old_password: string;
  
    @IsNotEmpty()
    @IsString()
    new_password: string;
  }
  
  export class ForgetDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }