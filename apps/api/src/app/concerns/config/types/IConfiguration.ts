import { LogLevel } from '../../logger/types/LogLevel';

export interface IConfiguration {
  name: string;
  version: string;
  database: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  };
  log: {
    level: LogLevel;
  };
  auth: {
    apiAuthKey: string;
  };
}
