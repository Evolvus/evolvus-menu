module.exports.schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "menuGroupModel",
  "type": "object",

  "properties": {
    "menuGroupId": {
      "type": "number"
    },
    "createdBy": {
      "type": "string"
    },
    "creationDate": {
      "type": "string",
      "format": "date-time"
    },
    "lastUpdatedDate": {
      "type": "string",
      "format": "date-time"
    },
    "updatedBy": {
      "type": "string"
    },
    "langCode": {
      "type": "string"
    },
    "enabledFlag": {
      "type": "string"
    },
    "menuGroupCode": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "menuGroupType": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
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
    }

},
  "required": ["menuGroupCode", "menuGroupType", "title"]
}
