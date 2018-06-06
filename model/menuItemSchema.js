
//JSON schema representation of menuItem  module
module.exports.schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "MenuItemModel",
  "type": "object",
  "properties": {
    "menuItemId": {
      "type": "string"
    },
    "menuItemType":{
      "type":"string",
      "minLength": 1,
      "maxLength": 50
    },
    "applicationCode":{
      "type":"string",
      "minLength": 1,
      "maxLength": 4
    },
    "menuGroupId": {
      "type": "string"
    },
    "menuItemCode": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "createdBy":{
      "type":"String"
    },
    "creationDate":{
      "type": "string",
      "format": "date-time"
    },
    "lastUpdatedDate":{
      "type": "string",
      "format": "date-time"
    },
    "updatedBy":{
      "type":"String"
    },
    "enabledFlag" :{
      "type":"String"
    },
    "verifiedFlag":{
      "type":"number"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "icon": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "menuItemOrder": {
      "type": "number"
    }
  },
  "required": ["menuGroupId", "menuItemCode",  "applicationCode"]
};
