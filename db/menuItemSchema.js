const mongoose = require('mongoose');

var menuItemSchema = new mongoose.Schema({
  menuItemId: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  menuGroupId: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  menuItemCode: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 4
  },
  createdBy:{
    type: String,
    required: true,
    minlength: 1
  },
  creationDate:{
    type: Date,
    required: true
  },
  lastUpdatedDate:{
    type: Date,
    required: true
  },
  updatedBy:{
    type: String,
    required: true,
    minlength: 1
  },
  enabledFlag :{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  icon: {
    type: String,
    minlength: 1,
  },
  menuItemOrder:{
    type: Number,
  }
});

module.exports = menuItemSchema;
