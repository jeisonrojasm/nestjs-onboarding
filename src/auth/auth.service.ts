import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async login(username: string, password: string) {
    // Usuario ficticio
    // TODO: Buscar el usuario admin en la base de datos
    if (username !== 'admin' || password !== 'admin') {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: 1,
      username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
