const {Schema, model } = require('mongoose');

const careerSchema = new Schema({

  jobtitle:{
      type: String,
      required: true,
  },

  jobdesc:{
    type: String,
    required: true,
}
});

const Careers = model("Careers", careerSchema); 

module.exports = Careers;