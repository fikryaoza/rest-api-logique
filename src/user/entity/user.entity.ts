import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
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