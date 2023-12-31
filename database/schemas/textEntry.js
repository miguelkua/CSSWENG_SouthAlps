const {Schema, model } = require('mongoose');

const textSchema = new Schema({
  page:{
    type: String,
    required: true,
},

  id:{
      type: String,
      required: true,
  },

  text:{
      type: String
  },
});

const TextEntry = model("TextEntries", textSchema); 

module.exports = TextEntry;