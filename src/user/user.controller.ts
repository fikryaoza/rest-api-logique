import { Controller, UseGuards, Body, Param, Get, Post, Put, Query, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ResponseMessage } from '../interceptors/response.decorator';
import { AuthGuard } from '@nestjs/passport';
import { validate } from "class-validator"
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserIdDto } from './dto/userid.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('list')
    @ResponseMessage('Users records fetched Succesfully')
    @UseGuards(AuthGuard('key'))
    async findAll(@Query() query): Promise<UserIdDto[]> {

        return await this.userService.findAll(query) as UserIdDto[];
    }

    @Get(':id')
    async findOneById(@Param() params): Promise<UserIdDto> {
        return await this.userService.findById(params.id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('photos'))
    async create(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ],
        }),
    )
    files: Express.Multer.File, @Body() user: CreateUserDto): Promise<UserIdDto> {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        if (!validateEmail(user.email)) {
            throw new Error(`Validation failed!`)
        }
        return await this.userService.insert(user, files) as UserIdDto;
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('photos'))
    async update(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ],
        }),
    )
    files: Express.Multer.File, @Body() updatedUser: CreateUserDto, @Param() params): Promise<UserIdDto> {
        const oldUser = await this.userService.findById(params.id);
        return await this.userService.update(oldUser, updatedUser, files);
    }
}
