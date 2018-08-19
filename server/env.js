import dotenv from 'dotenv'
import path from 'path'

const dotenvPath = path.resolve(__dirname, `../.env`)
dotenv.config({ path: dotenvPath })