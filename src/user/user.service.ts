import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Like } from 'typeorm';
import { Users } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) { }

    async findAll(query: any): Promise<Users[]> {
        let querySearch = {
            where: {},
            order: {},
            take: 10,
            skip: 1
        }
        if (query.lt) {
            querySearch.take = query.lt ? parseInt(query.lt) : 10;
        }
        if (query.of) {
            querySearch.skip = (querySearch.take * query.of ? query.of : 1) - querySearch.take;
        }
        if (query.ob) {
            querySearch.order = { [query.ob]: query.sb ? query.sb : 'asc' }
        }
        if (query.q) querySearch.where = {
            name: Like(`%${query.q || ''}%`)
        }
        try {
            return await this.userRepository.find(querySearch);
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

        const saltOrRounds = 10;
        let password = await bcrypt.hash(user['password'], saltOrRounds);
        Object.keys(user).forEach((key) => {
            newUser[key] = user[key];
            newUser['photos'] = files.buffer.toString('base64');

            newUser['password'] = password;
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
