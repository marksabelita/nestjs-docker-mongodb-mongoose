import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/database/entiry.repository.base';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    projectModel: Model<UserDocument>,
  ) {
    super(projectModel);
  }
}
