import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsDate,
    IsPhoneNumber,    
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsDate()
    @IsNotEmpty()
    birthdate: Date;
  
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: number;
  
    @IsString()
    @IsNotEmpty()
    adress: string;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    country: string;
  }
  