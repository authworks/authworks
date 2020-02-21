import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SequenceProvider } from './sequence.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectDataprovider {
  constructor(
    private sequenceProvider: SequenceProvider,
    @InjectRepository(ProjectEntity)
    private storyRepository: Repository<ProjectEntity>
  ) {}


}
