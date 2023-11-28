const mongoose = require('mongoose')

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: false,
    default: "person1.jpg"
  }
})

const Careers = mongoose.model('careers', CareerSchema)
module.exports = Careers;