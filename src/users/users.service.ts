import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findOne(
    params: Record<string, unknown> = {},
    projection?: Record<string, unknown>,
  ) {
    return this.usersRepository.findOne(params, projection);
  }

  create(createProjectDto: CreateUserDto) {
    return this.usersRepository.create(createProjectDto);
  }

  findAll(params: Record<string, unknown> = {}) {
    return this.usersRepository.find(params);
  }

  update(id: string, updateProjectDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: updateProjectDto },
    );
  }

  remove(id: string) {
    return this.usersRepository.delete({
      _id: id,
    });
  }
}
