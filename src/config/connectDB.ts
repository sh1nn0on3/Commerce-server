const { default: moongoose } = require('mongoose')

const ConnectDB = async () => {
  try {
    const conn = await moongoose.connect(process.env.MONGODB_URI)
    if (conn.connection.readyState === 1) console.log('Connected to MongoDB')
    else console.log('Failed to connect to MongoDB')
  } catch (err) {
    console.error('3 err' + err)
  }
}
export default ConnectDB
