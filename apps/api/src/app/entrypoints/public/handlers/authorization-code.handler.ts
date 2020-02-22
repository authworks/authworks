import { GrantHandler } from '../oauth.endpoint';
import { Request, Response } from 'express'
import { ResponseType } from '../../../../../../../libs/common/src/lib/response-type';
import { plainToClass } from 'class-transformer';
import { snakeToCamel } from '@authworks/common';
import { Injectable } from '@nestjs/common';
import { GrantType } from '../../../../../../../libs/common/src/lib/grant-type';

@Injectable()
export class AuthorizationCodeGrantHandler implements GrantHandler {
  authorize(req: Request, res: Response) {
    const authorizationRequest = plainToClass(AuthorizationRequest, snakeToCamel(req.query))
    res.redirect(authorizationRequest.redirectUri)
  }

  token(req: Request, res: Response) {
    const accessTokenRequest = plainToClass(AccessTokenRequest, snakeToCamel(req.query))
    res.redirect(accessTokenRequest.redirectUri)
  }

}

export class AuthorizationRequest {
  responseType: ResponseType.CODE
  clientId: string
  redirectUri?: string
  scope?: string
  state?: string
}

export class AuthorizationResponse {
  code: string
  state: string
}

export class AuthorizationErrorResponse {
  error: ErrorCode
  errorDescription?: string
  errorUri?: string
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
  grantType: GrantType.AUTHORIZATION_CODE // required
  code: string  // required if authorization code grant
  redirectUri: string // required
  clientId: string
}

export class AccessTokenResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  refreshToken: string
}

export class AccessTokenErrorResponse {
  error: ErrorCode
  errorDescription?: string
  errorUri?: string
  state: string
}
