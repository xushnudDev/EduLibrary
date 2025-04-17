import {config} from 'dotenv';

config();

export const PORT = parseInt(process.env.APP_PORT,10) || 3000;