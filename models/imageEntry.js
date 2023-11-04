const {Schema, model } = require('mongoose');

const imageSchema = new Schema({
  page:{
    type: String,
    required: true,
},

  id:{
      type: String,
      required: true,
  },

  imageName:{
      type: String,
      required: true,
  },
});

const ImageEntry = model("ImageEntries", imageSchema); 

module.exports = ImageEntry;