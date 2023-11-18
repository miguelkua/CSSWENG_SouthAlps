const {Schema, model } = require('mongoose');

const acredSchema = new Schema({

  imageName:{
      type: String,
      required: true,
  }
});

const Accreditations = model("Accreditations", acredSchema); 

module.exports = Accreditations;