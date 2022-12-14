import { DataSource } from 'typeorm';
import { TweetEntity } from "../entities/tweet.entity"

export const tweetProvider = [
  {
    provide: 'TWEET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TweetEntity),
    inject: ['DATA_SOURCE'],
  },
];