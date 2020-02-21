import { IConfigurations } from './types/IConfigurations';

const configurations: IConfigurations = {
  default: {
    name: 'stuff-content-api',
    version: '${BUILD_VERSION}',
    database: {
      host: 'localhost',
      port: 5432,
      database: '${DB_NAME}',
      username: '${DB_USERNAME}',
      password: '${DB_PASSWORD}',
    },
    log: {
      level: 'info',
    },
    auth: {
      apiAuthKey: '${API_AUTH_KEY}',
    },
  },
  local: {
    database: {
      database: '${USER/./-}-authworks',
      username: 'postgres',
      password: 'postgres',
    },
    log: {
      level: 'debug',
    },
    auth: {
      apiAuthKey: 'xEEJ4#c_iA1JmVX52Eby97^dNL8ief',
    },
  },
  devint: {},
  staging: {},
  production: {},
};

export default configurations;
