import { IRegister } from '~/types'
export const registerService = async (data: IRegister) => {
  return new Promise((resolve, reject) => {
    try {
      const { name, number, email, password } = data
      if (!name || !number || !email || !password) {
        return resolve({
          status: 400,
          message: 'Please enter all fields'
        })
      }
    } catch (err: any) {
      return reject({
        status: 500,
        message: err.message
      })
    }
  })
}
