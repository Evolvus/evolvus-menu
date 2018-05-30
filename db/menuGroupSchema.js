const mongoose = require("mongoose");

var menuGroupSchema = new mongoose.Schema({
  menuGroupId: {
    type: Number,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  createdBy: {
    type: String,
    minLength: 1
  },
  creationDate: {
    type: Date,
  },
  lastUpdatedDate: {
    type: Date,
  },
  updatedBy: {
    type: String,
    minLength: 1
  },
  langCode: {
    type: String,
    minLength: 1
  },
  enabledFlag: {
    type: String
  },
  menuGroupCode: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    maxLength: 50
  },
  menuGroupType: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  icon: {
    type: String,
    minLength: 1,
    maxLength: 50
  }
});
module.exports = menuGroupSchema;
