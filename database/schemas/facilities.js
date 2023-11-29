const mongoose = require('mongoose')

const FacilitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: false,
    default: "facilitymain.jpg"
  }
})

const Facilities = mongoose.model('facilities', FacilitySchema)
module.exports = Facilities;