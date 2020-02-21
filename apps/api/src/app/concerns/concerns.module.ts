import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

const providers: Provider[] = [ConfigService, LoggerService, JwtStrategy];

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConcernsModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get().auth.apiAuthKey,
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers,
  exports: providers,
})
export class ConcernsModule {}
