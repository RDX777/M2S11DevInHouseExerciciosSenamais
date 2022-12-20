import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CriacaoUsuarioDto {

  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsString()
  @IsNotEmpty()
  readonly usuario: string;

  @IsString()
  @IsNotEmpty()
  readonly senha: string;

  @IsEmail()
  readonly email: string;

  @IsUrl()
  readonly urlFoto: string;
}