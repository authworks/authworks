import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class SequenceProvider {
  constructor(private em: EntityManager) {}

  async nextValue(name: NumericSequence) {
    const result: { nextval: string }[] = await this.em.query(
      `select nextval($1)`,
      [name],
    );
    return parseInt(result[0].nextval, 10);
  }
}

export enum NumericSequence {
  ProjectId = 'seq_project_id',
  ClientId = 'seq_client_id',
}
