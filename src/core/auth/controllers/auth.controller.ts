import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CriacaoUsuarioDto } from "src/users/dtos/criacao-usuarios.dto";
import { Roles } from "../guards/decorator/roles.decorator";
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { AuthService } from "../services/auth.service";

// @UseGuards(JwtAuthGuard) //Autenticação
// @Roles("") // Autorização
@Controller("auth")
export class AuthController {

  constructor(
    private readonly authService: AuthService) { }

}