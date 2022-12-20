import { Module } from '@nestjs/common';

import { databaseProviders } from 'src/core/database/database.providers';
import { usuarioProvider } from 'src/users/providers/usuario.provider';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    AuthService
  ]
})
export class AuthModule { }