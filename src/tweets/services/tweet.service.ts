import { Inject, Injectable } from "@nestjs/common";
import { UsuarioEntity } from "src/users/entities/usuario.entity";
import { Repository, ILike } from 'typeorm';
import { CriacaoTweetDTO } from "../dtos/criacao-tweet.dto";
import { ListaTweetDto } from "../dtos/lista-tweet.dto";
import { RetornoCriacaoTweetDto } from "../dtos/retorno-criacao-tweet.dto";
import { TweetEntity } from "../entities/tweet.entity";
import * as moment from "moment";
//import "moment/locale/pt-br";

@Injectable()
export class TweetService {

  constructor(
    @Inject('TWEET_REPOSITORY')
    private tweetRepository: Repository<TweetEntity>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>
  ) { }

  public async store(tweet: CriacaoTweetDTO): Promise<RetornoCriacaoTweetDto> {
    return new Promise(async (resolve, reject) => {
      try {

        const resposta = await this.tweetRepository.insert(tweet)
        const { id } = (resposta).identifiers[0];
        let idCriacao = new TweetEntity;
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

  public async listLatest(quantidade: number): Promise<ListaTweetDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const retornoTweets = await this.tweetRepository.find({
          relations: {
            usuario: true
          },
          order: {
            "data": "DESC",
          },
          take: quantidade,
        })

        const tweets = this.listLatestTweets(retornoTweets);

        resolve(tweets)
      } catch (erro) {
        console.log(erro)
        reject({
          code: erro.code,
          detail: erro.detail
        });
      }
    })
  }

  private listLatestTweets(retornoTweets): ListaTweetDto[] {
    const tweets = retornoTweets.map((tweet) => {
      return {
        "nome": tweet.usuario ? tweet.usuario.nome : "Usuario deletado",
        "usuario": tweet.usuario ? tweet.usuario.usuario : "Usuario deletado",
        "tweet": tweet.texto,
        "data": tweet.data
      }
    })
    return tweets;
  }

  public async listByUser(idUsuario: number): Promise<ListaTweetDto[]> {
    return new Promise(async (resolve, reject) => {

      try {
        const retornoTweets = await this.usuarioRepository.findOne({
          where: {
            id: idUsuario
          },
          relations: {
            tweets: true
          },
          order: {
            tweets: {
              "data": "DESC"
            }
          }
        })
        const tweets = this.listByUserTweets(retornoTweets);
        resolve(tweets);
      } catch (erro) {
        console.log(erro)
        reject({
          code: erro.code,
          detail: erro.detail
        });
      }
    })
  }

  private listByUserTweets(retornoTweets): ListaTweetDto[] {
    const { nome, usuario, tweets } = retornoTweets;

    const listatweets = tweets.map((tweet) => {
      return {
        "nome": nome,
        "usuario": usuario,
        "tweet": tweet.texto,
        "data": tweet.data
      }
    })
    return listatweets;
  }

  public async listByHashtag(hashtag: string): Promise<ListaTweetDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const retornoTweets = await this.tweetRepository.find({
          where: {
            texto: ILike(`%#${hashtag}%`)
          },
          relations: {
            usuario: true
          },
          order: {
            "data": "DESC",
          },
        })
        const tweets = this.listLatestTweets(retornoTweets);
        resolve(tweets)
      } catch (erro) {
        reject(erro);
      }
    })
  }

  public async agregateByHashtag(hashtag: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataModelo = moment().subtract(24, "hour").format("YYYY-MM-DD HH:mm:ss");

        const retornoTweets = await this.tweetRepository
          .createQueryBuilder('t')
          .select("t.texto", "texto")
          .where("t.data >= :dataModelo", { dataModelo: dataModelo })
          .andWhere("t.texto LIKE :hashtag", { hashtag: `%#${hashtag}%` })
          .orderBy("t.data", "DESC")
          .getRawMany();

        resolve({ hashtag: hashtag, quantidade: retornoTweets.length })
      } catch (erro) {
        reject(erro);
      }
    })
  }

}