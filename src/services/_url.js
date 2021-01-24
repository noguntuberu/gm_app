/** */
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV } = process.env;

const app_config = {
    development: {
        users: 'http://localhost:7001/api/users',
        mailing: 'http://localhost:7002/api/mailing',
        sales: 'http://localhost:7003/api/sales',
    },
    production: {
        users: 'https://go-mailer.com/api/users',
        mailing: 'https://go-mailer.com/api/mailing',
        sales: 'https://go-mailer.com/api/sales',
    }
}

export const urls = { ...app_config[NODE_ENV]};