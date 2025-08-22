// users/users.controller.ts
import {
  Controller,
  Get,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserDocument } from './schema/user.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOkResponse({ description: 'Returns the currently logged-in user.' })
  async getMe(@Req() req) {
    const user = (await this.usersService.findById(req.user.sub)) as UserDocument;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
