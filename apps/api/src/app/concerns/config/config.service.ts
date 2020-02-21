import { Injectable } from '@nestjs/common';
import configurations from './config';
import { IConfiguration } from './types/IConfiguration';
import { Environment } from './types/Environment';
import { forIn, isString, isObject } from 'lodash';
import { substituteVariables } from './var-expansion';
import { merge } from 'lodash';

@Injectable()
export class ConfigService {
  config: IConfiguration;
  environment: Environment;
  environments: Environment[] = ['local', 'devint', 'staging', 'production'];

  constructor() {
    this.environment = this.getEnvironment();
    this.config = this.resolve(
      merge(configurations.default, configurations[this.environment]),
    );
  }

  private getEnvironment(): Environment {
    let env = 'local';
    const deploymentEnv = process.env.DEPLOY_ENV;
    if (!deploymentEnv) {
      console.warn(
        `DEPLOY_ENV is not set and use default value '${env}' instead`,
      );
    } else if (!this.environments.includes(env as Environment)) {
      console.warn(
        `DEPLOY_ENV is wrongly set as ${deploymentEnv} and use default value ${env} instead`,
      );
    } else {
      env = deploymentEnv;
    }
    return env as Environment;
  }

  get() {
    return this.config;
  }

  private resolve<T extends any>(obj: T): T {
    forIn(obj, (value: any, key: string) => {
      if (isString(value)) {
        const result = substituteVariables(value as string, {
          env: process.env,
        });
        if (result.error) {
          console.warn(`substitute ${value} error`, result.error);
        }
        obj[key] = result.value;
      }
      if (isObject(value)) {
        obj[key] = this.resolve(value);
      }
    });
    return obj;
  }
}
