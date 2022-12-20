import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CriacaoUsuarioDto } from "../dtos/criacao-usuarios.dto";
import { RetornoCriacaoUsuarioDto } from "../dtos/retorno-criacao-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";
import { CredenciaisDTO } from "src/core/auth/dto/credenciais-usuario.dto";
import { RetornoVerificacaoSenhaDto } from "../dtos/retorno-verificacao-senha.dto";

@Injectable()
export class UsuarioService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>
  ) { }

  public async store(usuarioCriacao: CriacaoUsuarioDto): Promise<RetornoCriacaoUsuarioDto> {
    return new Promise(async (resolve, reject) => {
      try {

        const { nome, usuario, senha, email, urlFoto } = usuarioCriacao;
        console.log(nome)

        const saltoUsuario = await this.criaSalt(12);
        const usuarioInsere = {
          nome: nome,
          usuario: usuario,
          salt: saltoUsuario,
          senha: await bcrypt.hash(senha, saltoUsuario),
          email: email,
          urlFoto: urlFoto,
        }

        const resposta = await this.usuarioRepository.insert(usuarioInsere)
        const { id } = (resposta).identifiers[0];
        let idCriacao = new UsuarioEntity;
        idCriacao = { ...id, id: id };
        resolve(idCriacao);

      } catch (erro) {
        reject({
          code: erro.code,
          detail: erro
        });
      }
    })
  }

  private async criaSalt(saltos: number): Promise<string> {
    return await bcrypt.genSalt(saltos)
  }

  public async verificaCredenciais(credenciais: CredenciaisDTO): Promise<RetornoVerificacaoSenhaDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, senha } = credenciais;

        const usuario = await this.usuarioRepository.findOne({
          where: {
            email: email,
            status: true,
          }
        }
        )

        if (usuario && await this.checkPassword(senha, usuario)) {
          const dadosUsuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
          }
          resolve(dadosUsuario)
        }
        throw new UnauthorizedException('E-mail e/ou senha incorretos')
      } catch (erro) {
        reject(erro)
      }
    })
  }

  private async checkPassword(senha: string, usuario: UsuarioEntity): Promise<boolean> {
    const hash = await bcrypt.hash(senha, usuario.salt)
    return hash === usuario.senha;
  }
}