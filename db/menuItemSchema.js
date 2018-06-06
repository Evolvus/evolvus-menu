const mongoose = require('mongoose');

var menuItemSchema = new mongoose.Schema({
  menuItemId: {
    type: String,
    required: true,
  },
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },
  menuGroupId: {
    type: String,
    required: true
  },
  menuItemType: {
    type: String,
    minLength: 1,
    maxLength: 50
  },
  applicationCode: {
    type: String,
    minLength: 1,
    maxLength: 4,
    required: true
  },
  menuItemCode: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 4
  },
  createdBy: {
    type: String,
    required: true,
    minlength: 1
  },
  creationDate: {
    type: Date,
    required: true
  },
  lastUpdatedDate: {
    type: Date
  },
  updatedBy: {
    type: String,
    minlength: 1
  },
  enabledFlag: {
    type: String
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
  menuItemOrder: {
    type: Number,
  }
});

module.exports = menuItemSchema;
