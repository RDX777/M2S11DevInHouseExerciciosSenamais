import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GoogleOAuthGuard } from './core/auth/guards/google-oauth.guard';

@Controller()
export class AppController {

  @Get('/auth/with-google')
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Request() req) {
  }

  @Get('/auth/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    if (!req.user) {
      return 'Sem usuário retornado do google';
    }

    return {
      mensagem: 'Google Info',
      user: req.user
    }
  }

}
