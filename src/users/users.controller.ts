import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/mine')
  getMyProfile(@Req() req) {
    const { user } = req;
    const userId = user.sub;
    return this.usersService.getMyProfile(userId);
  }
}
