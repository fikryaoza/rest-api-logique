import { Controller, UseGuards, Body, Param, Get, Post, Put, Delete, UseInterceptors, UploadedFile, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserIdDto } from './dto/userid.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('list')
    @UseGuards(AuthGuard('key'))
    async findAll(): Promise<UserIdDto[]> {
        return await this.userService.findAll() as UserIdDto[];
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
        console.log(params.id);
        const oldUser = await this.userService.findById(params.id);
        return await this.userService.update(oldUser, updatedUser, files);
    }
}
