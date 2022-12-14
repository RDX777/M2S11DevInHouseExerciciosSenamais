import { TweetEntity } from "src/tweets/entities/tweet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuarios" })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  nome: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  usuario: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  urlFoto: string;

  @Column({ type: "boolean", default: true })
  status: boolean;

  @OneToMany(() => TweetEntity, (tweets) => tweets.usuario, { cascade: true })
  tweets: TweetEntity[]

  addTweet(tweet: TweetEntity) {
    if (this.tweets == null) {
      this.tweets = new Array<TweetEntity>();
    }
    this.tweets.push(tweet);
  }
}