import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { TweetController } from './controllers/tweet.controller';
import { TweetService } from './services/tweet.service';
import { tweetProvider } from './providers/tweet.provider';
import { usuarioProvider } from 'src/users/providers/usuario.provider';

@Module({
  controllers: [TweetController],
  providers: [
    ...databaseProviders,
    ...tweetProvider,
    ...usuarioProvider,
    TweetService
  ]
})
export class TweetModule { }
