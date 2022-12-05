const {Schema, model} = require('mongoose')

const websiteSchema = new Schema ({
  websiteName: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type:Schema.Types.ObjectId, ref: 'User'
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})


const websiteModel = model ('Website', websiteSchema)
module.exports = websiteModel