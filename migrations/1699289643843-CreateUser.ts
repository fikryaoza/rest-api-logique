import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1699289643843 implements MigrationInterface {
    name = 'CreateUser1699289643843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`photos\` text NOT NULL, \`creditcard_type\` varchar(255) NOT NULL, \`creditcard_number\` varchar(255) NOT NULL, \`creditcard_name\` varchar(255) NOT NULL, \`creditcard_expired\` varchar(255) NOT NULL, \`creditcard_cvv\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
