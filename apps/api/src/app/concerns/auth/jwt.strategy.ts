import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

const AUTH_HEADER = 'Authorization';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private jwt: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ExtractJwt.fromHeader(AUTH_HEADER.toLowerCase()),
      ignoreExpiration: false,
      secretOrKey: config.get().auth.apiAuthKey,
    });
    if (config.environment === 'local') {
      console.log(
        '\x1b[35m%s\x1b[0m',
        `${AUTH_HEADER}: Bearer ${jwt.sign({
          sub: 'Authworks',
          name: 'Dev',
          iat: moment().unix(),
        })}`,
      );
    }
  }

  validate(payload: JwtPayload): User {
    return { name: payload.sub };
  }
}

export interface JwtPayload {
  iss: 'Authworks';
  sub: string; // principal -> user
  aud: string; // resource server
  iat: string;
  exp: string;
}

export interface User {
  name: string;
}
