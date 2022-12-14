import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { usuarioProvider } from './providers/usuario.provider';

@Module({
  controllers: [UsuarioController],
  providers: [
    ...databaseProviders,
    ...usuarioProvider,
    UsuarioService
  ]
})
export class UsuarioModule { }
