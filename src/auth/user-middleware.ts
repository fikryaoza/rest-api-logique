import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'key') {
    constructor(

    ) {
        super({ header: 'KEY', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if ('HiJhvL$T27@1u^%u86g' === apiKey) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}