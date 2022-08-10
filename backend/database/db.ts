import * as dotenv from 'dotenv';
dotenv.config()

export const db = process.env.MONGODB_URL || ''
export const port = process.env.PORT || 4000;