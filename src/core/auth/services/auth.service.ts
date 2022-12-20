import { Inject, Injectable } from "@nestjs/common";
import { CriacaoUsuarioDto } from "src/users/dtos/criacao-usuarios.dto";
import { UsuarioEntity } from "src/users/entities/usuario.entity";
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(@Inject('USUARIO_REPOSITORY')
  private userRepository: Repository<UsuarioEntity>) { }

  async cadastro(novoUsuario: CriacaoUsuarioDto) {
    console.log(novoUsuario)
  }
}