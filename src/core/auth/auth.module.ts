import { forwardRef, Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './guards/strategy/jwt.strategy';
import { databaseProviders } from '../database/database.providers';
import { usuarioProvider } from 'src/users/providers/usuario.provider';
import { UsuarioModule } from 'src/users/usuario.module';
import { UsuarioService } from 'src/users/services/usuario.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6
      }
    }),
    forwardRef(() => UsuarioModule)
  ],
  controllers: [AuthController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    AuthService,
    JwtService,
    JwtStrategy,
    UsuarioService,
  ],
  exports: [AuthService],
})
export class AuthModule { }