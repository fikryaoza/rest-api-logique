import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './user-middleware';

@Module({
    imports: [PassportModule],
    providers: [HeaderApiKeyStrategy],
})
export class AuthModule { }