require('dotenv').config()
import 'module-alias/register'
import express, { Request, Response } from 'express'
import ConnectDB from '~config/connectDB'

const port = process.env.PORT || 8080

const app = express()
app.listen(port)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

ConnectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('http://localhost:' + port + '/api')
})
