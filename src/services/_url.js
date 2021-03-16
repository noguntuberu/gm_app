/** */
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV } = process.env;

const app_config = {
    development: {
        files: 'http://localhost:7004/api/files',
        keys: 'http://localhost:7006',
        mailing: 'http://localhost:7002/api/mailing',
        sales: 'http://localhost:7003/api/sales',
        users: 'http://localhost:7001/api/users',
    },
    production: {
        files: 'https://go-mailer.com/api/files',
        keys: 'https://keys.go-mailer.com/',
        mailing: 'https://go-mailer.com/api/mailing',
        sales: 'https://go-mailer.com/api/sales',
        users: 'https://go-mailer.com/api/users',
    }
}

export const urls = { ...app_config[NODE_ENV]};