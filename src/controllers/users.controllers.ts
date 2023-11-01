import { Request, Response } from 'express'
import { registerService } from '~/services'


const User = require('~models/User')
const asyncHandle = require('express-async-handler')

const register = asyncHandle(async (req: Request, res: Response) => {
  const response = await registerService(req.body )
    
})
