import { DataSource, DataSourceOptions } from "typeorm";
import { CreateUser1699289643843 } from '../migrations/1699289643843-CreateUser';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'fikry',
    password: 'nasipadang',
    database: 'logique',
    entities: ['dist/**/*.entity.js'],
    migrations: [CreateUser1699289643843]
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource