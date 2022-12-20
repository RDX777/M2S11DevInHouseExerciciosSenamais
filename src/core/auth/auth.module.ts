import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';

import { databaseProviders } from 'src/core/database/database.providers';
import { usuarioProvider } from 'src/users/providers/usuario.provider';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsuarioService } from 'src/users/services/usuario.service';
import { JwtStrategy } from './guards/strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6
      }
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    AuthService,
    UsuarioService,
    JwtService,
    JwtStrategy,
  ]
})
export class AuthModule { }