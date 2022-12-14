import { IsNotEmpty, IsString } from "class-validator";
import { CriacaoUsuarioDto } from "src/users/dtos/criacao-usuarios.dto";

export class CriacaoTweetDTO {

  readonly usuario_id: CriacaoUsuarioDto;

  @IsString()
  @IsNotEmpty()
  readonly texto: string;

}