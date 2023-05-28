import { BaseRepository } from '@app/common';
import { User } from '../../service-layer/models/user.schema';

export interface IUserRepository extends BaseRepository<User> {}
export const IUserRepository = Symbol('IUserRepository');
