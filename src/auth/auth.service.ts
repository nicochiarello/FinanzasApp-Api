import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/sing-up.dto';
import { UsersService } from 'src/users/users.service';
import { LogInDto } from './dto/log-in.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(singInDto: SignupDto) {
    // check if the user already exists
    const user = await this.usersService.findUserByEmail(singInDto.email);

    if (user) {
      throw new ConflictException('El usuario ya existe');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createdUser = await this.usersService.create(singInDto);

    const payload = {
      email: createdUser.email,
      sub: createdUser._id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LogInDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);

    if (!user) {
      throw new ConflictException({
        email: 'email not found',
      });
    }

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException({
        password: 'incorrect password',
      });
    }

    const payload = {
      email: user.email,
      sub: user._id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
