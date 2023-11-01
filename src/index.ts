import express, { Request, Response } from 'express'
require('dotenv').config()

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port)

app.get('/', (req: Request, res: Response) => {
  res.send('http://localhost:' + port + '/api')
})
