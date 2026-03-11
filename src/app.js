import express from 'express'
import { logger } from './helper/logger.js'
import connectDB from './db/dbConnect.js'
import dotenv from 'dotenv'
import testRouter from './router/test.router.js'
import morgan from 'morgan'

dotenv.config()
connectDB()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(`${process.env.API_VERSION}`, testRouter)


app.listen(process.env.PORT, () => {
logger.info(`Server started on port http://localhost:${process.env.PORT}`);
})