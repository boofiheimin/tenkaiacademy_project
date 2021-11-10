import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user.input.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private userRepository: UsersRepository) {}

    async createUser(createUserInputDto: CreateUserInputDto): Promise<User> {
        return this.userRepository.create(createUserInputDto);
    }

    async findByUsername(username: string, withPassword?: boolean): Promise<User> {
        return this.userRepository.findByUsername(username, withPassword);
    }

    async findUserById(id: string) {
        return this.userRepository.findById(id);
    }

    async revokeToken(id: string) {
        return this.userRepository.update(id, { refreshTokenVersion: { $inc: 1 } });
    }
}
