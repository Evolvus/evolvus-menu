module.exports.schema =
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "menuGroupItemMapModel",
  "type": "object",
  "properties": {
    "menuGroupItemMapId": {
    "type": "number",
    "required":true,
    "validate":{
      "validator":Number.isInteger,
      "message":'{VALUE} is not an Integer'
    }
  },
    "menuGroupId": {
      "type": "number"
    },
    "menuItemId": {
      "type": "number"
    },
    "menuItemOrder": {
      "type": "number"
    },
    " menuGroupItemMapCode":{
      "type":"number"
    },
    "createdBy":{
      "minlength":1,
      "maxlength":100
    },
    "creationDate":{
      "type":"string",
      "format":"date-time"
    },
    "lastUpdatedDate":{
      "type":"string",
      "format":"date-time"
    },
    "updatedBy":{
      "minlength":1,
      "maxlength":100,
      "type":"string"
    },
    "langCode":{
      "type":"string",
      "minlength":1,
      "maxlength":100
    },
    "enabledFlag":{
      "type":"string"
    }
  },
  "required": ["menuGroupItemMapId", "menuGroupId", "menuItemId"]
};
