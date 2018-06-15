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
        "applicationCode": {
          "type": "string",
          "minLength": 3,
          "maxLength": 20
        },
        "menuGroupCode": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "menuItems": {
          "type": "array",
          "properties": {
            "menuItemType": {
              "type": "string",
              "minLength": 1,
              "maxLength": 20
            },
            "applicationCode": {
              "type": "string",
              "minLength": 3,
              "maxLength": 20
            },
            "menuItemCode": {
              "type": "string",
              "minLength": 1,
              "maxLength": 20
            },
            "title": {
              "type": "string",
              "minLength": 1,
              "maxLength": 20
            }
          }
        },
        "createdBy": {
          "type": "string"
        },
        "updatedBy": {
          "type": ["string", "null"]
        },
        "createdDate": {
          "type": "string",
          "format": "date-time"
        },
        "lastUpdatedDate": {
          "type": ["string", "null"],
          "format": "date-time"
        },
        "enableFlag": {
          "type": "number",
          "default": 1
        },
        "deletedFlag": {
          "type": "number",
          "default": 0
        }
      },
  "required": ["tenantId", "applicationCode",  "createdDate", "createdBy", "lastUpdatedDate"]
};
