import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from './entity/user.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Users])],
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
