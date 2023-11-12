const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Services = mongoose.model('services', ServiceSchema)
module.exports = Services;