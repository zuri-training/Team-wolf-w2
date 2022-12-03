const mongoose = require ('mongoose')
const {config} = require ('dotenv')

config()

async function connect (uri) {
  try{
    mongoose.connect(uri||process.env.MONGO_DB_LOCAL)
    console.log('mongodb connected')
  } catch(err){
    err.message
  }
}

module.exports = connect