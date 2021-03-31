/** */
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV } = process.env;

const app_config = {
    development: {
        files: 'http://localhost:7004',
        keys: 'http://localhost:7006',
        mailing: 'http://localhost:7002',
        sales: 'http://localhost:7003',
        users: 'http://localhost:7001',
    },
    production: {
        files: 'https://files.go-mailer.com',
        keys: 'https://keys.go-mailer.com',
        mailing: 'https://mailing.go-mailer.com',
        sales: 'https://sales.go-mailer.com',
        users: 'https://users.go-mailer.com',
    },
}

export const urls = { ...app_config[NODE_ENV]};