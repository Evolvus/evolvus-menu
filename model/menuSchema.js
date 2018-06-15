/*
 ** JSON Schema representation of the menu model
 */
module.exports.schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "menuModel",
  "type": "object",
  "properties": {
      "tenantId": {
          "type": "string",
          "minLength": 1,
          "maxLength": 64
    },
  },
  "required": ["tenantId"]
};
