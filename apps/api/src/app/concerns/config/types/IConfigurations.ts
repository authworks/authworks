import { IConfiguration } from './IConfiguration';
import { DeepPartial } from 'utility-types';

export interface IConfigurations {
  default: IConfiguration;
  local: DeepPartial<IConfiguration>;
  devint: DeepPartial<IConfiguration>;
  staging: DeepPartial<IConfiguration>;
  production: DeepPartial<IConfiguration>;
}
