import { Get, Optional, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GrantType } from '../../../../../../libs/common/src/lib/grant-type';
import { AuthorizationCodeHandler } from './handlers/authorization-code.handler';

export interface GrantHandler {
  authorize(req: Request, res: Response)
  token(req: Request, res: Response)
}

export class OauthEndpoint {

  constructor(private authorizationCodeHandler: AuthorizationCodeHandler) {
  }

  @Get('/authorize')
  async authorize(
    @Query('grant_type') grantType: GrantType,
    @Query() req: Request,
    @Res() res: Response,
  ) {
    switch (grantType) {
      case GrantType.AUTHORIZATION_CODE:
        this.authorizationCodeHandler.authorize(req, res)
        break
      // tslint:disable-next-line:no-switch-case-fall-through
      default:
    }
  }

  @Post('/token')
  async token(
    @Query('grant_type') grantType: GrantType,
    @Query() req: Request,
    @Res() res: Response,
  ) {
    switch (grantType) {
      case GrantType.AUTHORIZATION_CODE:
        this.authorizationCodeHandler.token(req, res)
        break
      // tslint:disable-next-line:no-switch-case-fall-through
      default:
    }
  }

}


