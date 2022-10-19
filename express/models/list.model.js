const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  img:  {
    type: String,
    required: true
  },
  title:  {
    type: String,
    required: true
  },
  type:  {
    type: String,
    required: true
  },
  products:  {
    type: Array,
    required: true
  },
  time:  {
    type: String,
    required: true
  },
  description:  {
    type: String,
    required: true
  }
})
listSchema.pre('save', function(next) {
  if (this.products[0].split(',')) {
    this.products = this.products[0].split(',')
  }
  next()
});
module.exports = mongoose.model("List", listSchema)
