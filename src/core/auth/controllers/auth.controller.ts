import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CredenciaisDTO } from "../dto/credenciais-usuario.dto";
import { Roles } from "../guards/decorator/roles.decorator";
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { AuthService } from "../services/auth.service";
import { UsuarioService } from "../../../users/services/usuario.service";
import { NestResponse } from "src/core/http/nest-response";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";

// @UseGuards(JwtAuthGuard) //Autenticação
// @Roles("") // Autorização
@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService) { }

  @Post("token/cria")
  public async criaToken(@Body() credenciais: CredenciaisDTO) {
    const token = await this.authService.criaToken(credenciais);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `auth/token/cria` })
      .withBody(token)
      .build();

  }


}