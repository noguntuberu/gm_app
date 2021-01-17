/** */
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV } = process.env;

const app_config = {
    development: {
        users: 'http://localhost:7001',
        mailing: 'http://localhost:7002',
        sales: 'http://localhost:7003',
    },
    production: {
        users: 'https://go-mailer.com/api/users',
        mailing: 'https://go-mailer.com/api/mailing',
        sales: 'https://go-mailer.com/api/sales',
    }
}

export default app_config[NODE_ENV];