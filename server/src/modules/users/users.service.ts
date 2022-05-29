import { Inject, Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {
  }

  async getById(userId: number): Promise<User> {
    return this.usersRepository.findByPk(userId)
  }
}
