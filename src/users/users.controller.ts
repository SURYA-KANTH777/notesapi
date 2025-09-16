// users/users.controller.ts
import {
  Controller,
  Get,
  Req,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Delete,
  Param,
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
    const user = (await this.usersService.findById(req.user.userId)) as UserDocument;
    console.log(user)
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      email: user.email,
      createdAt: user.createdAt,
      userId: user._id,
    };
  }

  
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req) {
    if (id !== req.user.userId) {
      throw new UnauthorizedException('You can only delete your own account');
    }
    const user = await this.usersService.remove(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
}
