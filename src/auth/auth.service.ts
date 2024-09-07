import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sing-in.dto';
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
  async signIn(singInDto: SignInDto) {
    // check if the user already exists
    const user = await this.usersService.findUserByEmail(singInDto.email);

    if (user) {
      throw new ConflictException('El usuario ya existe');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.usersService.create(singInDto);

    return {
      message: 'Usuario creado con éxito',
    };
  }

  async login(loginDto: LogInDto) {
    const user = await this.usersService.findUserByEmail(loginDto.email);

    if (!user) {
      throw new ConflictException('Usuario no encontrado');
    }

    const passwordMatch = await compare(loginDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
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
