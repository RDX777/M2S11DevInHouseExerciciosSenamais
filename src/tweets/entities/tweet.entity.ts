import { UsuarioEntity } from "src/users/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tweets" })
export class TweetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id, { onDelete: 'SET NULL' })
  //@JoinColumn({ name: 'user_id' })
  usuario: UsuarioEntity;

  @Column({ type: "text" })
  texto: string;

  @Column({
    type: "timestamp",
    default: () => 'CURRENT_TIMESTAMP'
  })
  data: Date;
}