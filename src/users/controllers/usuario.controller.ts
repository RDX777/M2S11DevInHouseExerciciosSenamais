import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { RetornoCriacaoUsuarioDto } from "../dtos/retorno-criacao-usuario.dto";
import { CriacaoUsuarioDto } from "../dtos/criacao-usuarios.dto";
import { UsuarioService } from "../services/usuario.service";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";
import { TrocaSenhaDto } from "../dtos/troca-senha.dto";

@Controller("usuarios")
export class UsuarioController {

  constructor(private usuarioService: UsuarioService) { }

  @Post("cadastra")
  public async store(@Body() usuario: CriacaoUsuarioDto): Promise<RetornoCriacaoUsuarioDto> {
    try {
      return await this.usuarioService.store(usuario);
    } catch (erro) {
      console.log(erro)
      if (erro.code == 23505)
        throw new HttpException({ reason: erro.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("trocasenha")
  public async trocasenha(@Request() request: any, @Body() senhas: TrocaSenhaDto) {
    // console.log(request)
    // console.log(senhas)
    await this.usuarioService.trocasenha(request.user, senhas);
  }

}