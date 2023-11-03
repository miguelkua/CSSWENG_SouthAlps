const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  icon:{
    type: String,
    required: true
  }
})

const Contacts = mongoose.model('contactinfo', ContactSchema)
module.exports = Contacts;