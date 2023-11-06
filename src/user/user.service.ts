import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) { }

    async findAll(): Promise<Users[]> {
        try {
            return await this.userRepository.find({});
        } catch (err) {
            return err;
        }
    }

    async findById(id: string): Promise<Users> {
        try {
            return await this.userRepository.findOneById(id);
        } catch (err) {
            return err;
        }
    }

    async insert(user: CreateUserDto, files: any): Promise<Users> {
        const newUser = new Users();
        Object.keys(user).forEach((key) => {
            newUser[key] = user[key];
            newUser['photos'] = files.buffer.toString('base64');
        });

        try {
            return await this.userRepository.save(newUser);
        } catch (err) {
            return err;
        }
    }

    async update(oldUser: Users, updated_values: CreateUserDto, files: any): Promise<Users> {
        const updatedUser = oldUser;

        Object.keys(updated_values).forEach((key) => {
            updatedUser[key] = updated_values[key];
            updatedUser['photos'] = files.buffer.toString('base64');
        });

        try {
            return await this.userRepository.save(updatedUser);
        } catch (err) {
            return err;
        }

    }
}
