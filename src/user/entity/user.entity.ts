import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
    IsEmail,
} from "class-validator";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column('text')
    photos: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    creditcard_type: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    creditcard_number: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    creditcard_name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    creditcard_expired: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    creditcard_cvv: string;
}