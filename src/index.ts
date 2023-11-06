require('dotenv').config()
import 'module-alias/register'
import express, { Request, Response } from 'express'
import ConnectDB from '~config/connectDB'
import initRoutes from './routes'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 8080

const app = express()
app.listen(port)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

ConnectDB()
initRoutes(app)

console.log('http://localhost:' + port + '/api')

app.get('/', (req: Request, res: Response) => {
  res.send('http://localhost:' + port + '/api')
})
