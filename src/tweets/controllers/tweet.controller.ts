import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Query, Catch } from "@nestjs/common";
import { CriacaoTweetDTO } from "../dtos/criacao-tweet.dto";
import { TweetService } from "../services/tweet.service";

@Controller("tweets")
export class TweetController {

  constructor(private tweetService: TweetService) { }

  @Post("cria")
  public async store(@Body() tweet: CriacaoTweetDTO) {
    try {
      return await this.tweetService.store(tweet);
    } catch (erro) {
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("lista")
  public async listLatest(@Query("quantidade") quantidade: string) {
    if (+quantidade === 0 || quantidade) {
      try {
        return await this.tweetService.listLatest(+quantidade);
      } catch (erro) {
        throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
      }
    }
    throw new HttpException({ reason: "Quantidade deve ser maior que 0" }, HttpStatus.BAD_REQUEST);
  }

  @Get("usuario/:idusuario")
  public async listByUser(@Param("idusuario") idUsuario: string) {
    try {
      return await this.tweetService.listByUser(+idUsuario);
    } catch (erro) {
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("hashtag/:hashtag")
  public async listByHashtag(@Param("hashtag") hashtag: string) {
    try {
      return await this.tweetService.listByHashtag(hashtag);
    } catch (erro) {
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("agregar/:hashtag")
  public async agregateByHashtag(@Param("hashtag") hashtag: string) {
    try {
      return await this.tweetService.agregateByHashtag(hashtag);
    } catch (erro) {
      throw new HttpException({ reason: erro }, HttpStatus.BAD_REQUEST);
    }
  }

}