const mongoose = require("mongoose");

var menuGroupSchema = new mongoose.Schema({
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },
  applicationCode: {
    type: String,
    minLength: 1,
    maxLength: 15
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
    minLength: 1,
    maxLength: 50
  },
  mgtitle: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  icon: {
    type: String,
    minLength: 1,
    maxLength: 50
  },
  verifiedFlag: {
    type: Number
  }
});
module.exports = menuGroupSchema;