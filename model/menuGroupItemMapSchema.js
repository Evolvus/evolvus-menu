module.exports.schema ={
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "menuGroupItemMapModel",
  "type": "object",
  "properties": {
    "menuGroupItemMapId":{
    "type": "string"
  },
  "applicationCode":{
    "type":"string",
    "minlength":1,
    "maxlength":4
  },
  "verifiedFlag":{
    "type":"number"
  },
    "menuGroupId": {
      "type": "string"
    },
    "menuItemId": {
      "type": "string"
    },
    "menuItemOrder": {
      "type": "number"
    },
    "menuGroupItemMapCode":{
      "type":"string",
    "minlength":1,
    "maxlength":50
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
  "required": ["menuGroupItemMapCode", "menuGroupId", "menuItemId","applicationCode"]
};
