const mongoose = require("mongoose");
const validator = require("validator");


var menuSchema = new mongoose.Schema({
  // Add all attributes below tenantId
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },

});

module.exports = menuSchema;
