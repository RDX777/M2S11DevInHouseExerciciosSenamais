import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { TweetModule } from './tweets/tweet.module';
import { UsuarioModule } from './users/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './core/auth/auth.module';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6
      }
    }),
    UsuarioModule,
    TweetModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },],
})
export class AppModule { }
