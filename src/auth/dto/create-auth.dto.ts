import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Controller, Get, Req, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export class CreateAuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpassword', minLength: 6, description: 'Password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;
}

