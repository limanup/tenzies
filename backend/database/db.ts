import 'dotenv/config'

export const localdb = "mongodb://localhost:27017/reactdb"
export const db = process.env.MONGODB_URL || ''
export const port = process.env.PORT || 4000;