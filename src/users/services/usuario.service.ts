import { forwardRef, Inject, Injectable, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CriacaoUsuarioDto } from "../dtos/criacao-usuarios.dto";
import { RetornoCriacaoUsuarioDto } from "../dtos/retorno-criacao-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";
import { CredenciaisDTO } from "src/core/auth/dto/credenciais-usuario.dto";
import { RetornoVerificacaoSenhaDto } from "../dtos/retorno-verificacao-senha.dto";
import { AuthService } from "src/core/auth/services/auth.service";

@Injectable()
export class UsuarioService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) { }

  public async store(usuarioCriacao: CriacaoUsuarioDto): Promise<RetornoCriacaoUsuarioDto> {
    return new Promise(async (resolve, reject) => {
      try {

        const { nome, usuario, senha, email, urlFoto } = usuarioCriacao;

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
        if (resposta) {
          const credenciais = { email: email, senha: senha }
          const token = await this.authService.criaToken(credenciais)
          resolve(token)
        }
        throw new ServiceUnavailableException("Erro ao gerar token")

      } catch (erro) {
        reject({
          code: erro.code,
          detail: erro.detail
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