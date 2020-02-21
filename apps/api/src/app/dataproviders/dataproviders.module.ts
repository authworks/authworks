import { Module } from '@nestjs/common';

import { AssetEntity } from './entities/asset.entity';
import { ConcernsModule } from '../concerns/concerns.module';
import { ConfigService } from '../concerns/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SequenceProvider } from './providers/sequence.provider';
import { StoryDataprovider } from './providers/project.provider';
import { StoryEntity } from './entities/story.entity';
import { ImageEntity } from './entities/image.entity';
import { WidgetEntity } from './entities/widget.entity';
import { AssetTransitionEntity } from './entities/asset-transition.entity';
import { FragmentEntity } from './entities/fragment.entity';
import { RelatedLinkEntity } from './entities/related-link.entity';
import { LookupProvider } from './providers/lookup.provider';
import { AssetTypeEntity } from './entities/asset-type.entity';
import { AssetSubTypeEntity } from './entities/asset-sub-type.entity';
import { FlagEntity } from './entities/flag.entity';
import { AdExclusionEntity } from './entities/ad-exclusion.entity';
import { SourceEntity } from './entities/source.entity';
import { TopicEntity } from './entities/topic.entity';
import { AuthorEntity } from './entities/author.entity';

// Entity registry
const entities: any[] = [
  AssetEntity,
  StoryEntity,
  ImageEntity,
  WidgetEntity,
  AssetTransitionEntity,
  FragmentEntity,
  RelatedLinkEntity,
  AssetTypeEntity,
  AssetSubTypeEntity,
  FlagEntity,
  AdExclusionEntity,
  SourceEntity,
  TopicEntity,
  AuthorEntity,
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
  providers: [SequenceProvider, StoryDataprovider, LookupProvider],
  exports: [StoryDataprovider, LookupProvider],
})
export class DataprovidersModule {}
