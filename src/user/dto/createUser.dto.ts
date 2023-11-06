export class CreateUserDto {
    readonly name: string;
    readonly address: string;
    readonly email: string;
    readonly password: string;
    readonly photos: string;
    readonly creditcard_type: string;
    readonly creditcard_number: string;
    readonly creditcard_name: string;
    readonly creditcard_expired: string;
    readonly creditcard_cvv: string;
}