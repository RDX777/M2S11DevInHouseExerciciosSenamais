import { forwardRef, Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { usuarioProvider } from './providers/usuario.provider';
import { AuthService } from 'src/core/auth/services/auth.service';
import { AuthModule } from 'src/core/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/core/auth/guards/strategy/jwt.strategy';

@Module({
  controllers: [UsuarioController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    UsuarioService,
    AuthService,
    AuthModule,
    JwtService,
    JwtStrategy,
  ],
  exports: [UsuarioService],
  imports: [forwardRef(() => UsuarioModule)]
})
export class UsuarioModule { }
