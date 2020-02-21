import { Injectable } from '@nestjs/common';
import { Message } from '@authworks/common';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
