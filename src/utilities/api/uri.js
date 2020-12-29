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
        users: 'https://users.go-mailer.com',
        mailing: 'https://mailing.go-mailer.com',
        sales: 'https://sales.go-mailer.com',
    }
}

export default app_config[NODE_ENV];