import { GrantHandler } from '../oauth.endpoint';
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer';
import { camelToSnake, snakeToCamel } from '@authworks/common';
import { Injectable } from '@nestjs/common';
import { GrantType } from '../../../../../../../libs/common/src/lib/grant-type';

@Injectable()
export class ClientCredentialsGrantHandler implements GrantHandler {
  authorize(req: Request, res: Response) {
    res.sendStatus(401)
  }

  token(req: Request, res: Response) {
    const accessTokenRequest = plainToClass(AccessTokenRequest, snakeToCamel(req.query))
    res.json(camelToSnake(new AccessTokenResponse()))
  }

}


export enum ErrorCode {
  InvalidRequest = 'invalid_request',
  UnauthorizedClient = 'unauthorized_client',
  AccessDenied = 'access_denied',
  UnsupportedResponseType = 'unsupported_response_type',
  InvalidScope = 'invalid_scope',
  ServerError = 'server_error',
  TemporarilyUnavailable = 'temporarily_unavailable',
}


export class AccessTokenRequest {
  grantType: GrantType.CLIENT_CREDENTIALS // required
  scope?: string  // optional
}

export class AccessTokenResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
}

