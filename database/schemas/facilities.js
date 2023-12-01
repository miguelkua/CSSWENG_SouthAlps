const {Schema, model } = require('mongoose');

const facilitySchema = new Schema({

  imageName:{
    type: String,
    required: true,
  },

  facDesc:{
    type: String,
    required: true,
}
});

const Facilities = model("Facilities", facilitySchema); 

module.exports = Facilities;