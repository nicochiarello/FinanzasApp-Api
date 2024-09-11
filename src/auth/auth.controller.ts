import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/sing-up.dto';
import { LogInDto } from './dto/log-in.dto';

// /api/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() signInDto: SignupDto) {
    return this.authService.signup(signInDto);
  }

  @Post('/login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }
}
