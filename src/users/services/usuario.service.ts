import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { CriacaoUsuarioDto } from "../dtos/criacao-usuarios.dto";
import { RetornoCriacaoUsuarioDto } from "../dtos/retorno-criacao-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>
  ) { }

  public async store(usuario: CriacaoUsuarioDto): Promise<RetornoCriacaoUsuarioDto> {
    return new Promise(async (resolve, reject) => {
      try {

        const resposta = await this.usuarioRepository.insert(usuario)
        const { id } = (resposta).identifiers[0];
        let idCriacao = new UsuarioEntity;
        idCriacao = { ...id, id: id };
        resolve(idCriacao);

      } catch (erro) {
        reject({
          code: erro.code,
          detail: erro.detail
        });
      }
    })
  }
}