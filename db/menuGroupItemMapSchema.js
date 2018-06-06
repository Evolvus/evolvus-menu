const mongoose = require('mongoose');
var menuGroupItemMapSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },
  applicationCode: {
    type: String,
    minlength: 1,
    maxlength: 15,
    required: true
  },
  verifiedFlag: {
    type: Number
  },
  menuGroupId: {
    type: String,
    required: true
  },
  menuItemId: {
    type: String,
    required: true
  },
  menuItemOrder: {
    type: Number
  },
  menuGroupItemMapCode: {
    type: String,
    minlength: 1,
    unique: true,
    maxlength: 50,
    required: true
  },
  createdBy: {
    type: String,
    minlength: 1,
    maxlength: 100
  },
  creationDate: {
    type: Date
  },
  lastUpdatedDate: {
    type: Date
  },
  updatedBy: {
    type: String,
    minlength: 1,
    maxlength: 100
  },
  langCode: {
    type: String,
    minlength: 1,
    maxlength: 100
  },
  enabledFlag: {
    type: String
  }

});

module.exports = menuGroupItemMapSchema;
