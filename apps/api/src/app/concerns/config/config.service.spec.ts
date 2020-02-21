import { ConfigService } from './config.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import {
  mockService,
  ServiceMock,
} from '../../helpers/service-mock/service-mock';

describe('ConfigService', () => {
  let module: TestingModule;
  let configService: ConfigService;
  let loggerService: ServiceMock<LoggerService>;

  beforeAll(() => {
    process.env.DEPLOY_ENV = 'devint';
    process.env.DB_USERNAME = 'abc';
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [],
      providers: [
        ConfigService,
        {
          provide: LoggerService,
          useClass: mockService(LoggerService),
        },
      ],
    }).compile();

    configService = module.get(ConfigService);
    loggerService = module.get(LoggerService);
  });

  it('should resolve environment vars', () => {
    const userName = configService.get().database.username;
    expect(userName).toEqual('abc');
  });
});
