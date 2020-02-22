import { Module } from '@nestjs/common';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConcernsModule } from '../concerns/concerns.module';
import { ConfigService } from '../concerns/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceProvider } from './providers/sequence.provider';
import { ProjectDataprovider } from './providers/project.provider';
import { ProjectEntity } from './entities/project.entity';

// Entity registry
const entities: any[] = [
  ProjectEntity
];

const repositoryModule = TypeOrmModule.forFeature(entities);

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConcernsModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    ...config.get().database,
    entities,
    namingStrategy: new SnakeNamingStrategy(),
    logger: 'advanced-console',
    logging: ['query', 'schema'],
    loggerLevel: 'debug',
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
  }),
  inject: [ConfigService],
});

@Module({
  imports: [typeOrmModule, repositoryModule],
  providers: [SequenceProvider, ProjectDataprovider],
  exports: [ProjectDataprovider],
})
export class DataprovidersModule {}
