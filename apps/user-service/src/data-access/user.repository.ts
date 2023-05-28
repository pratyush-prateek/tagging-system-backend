import { BaseRepository } from '@app/common';
import { IUserRepository } from './interfaces/user.repository.interface';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from '../service-layer/models/user.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  protected readonly logger: Logger;
  constructor(
    @InjectModel(User.name) userRequest: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userRequest, connection);
    this.logger = new Logger(UserRepository.name);
  }
}
