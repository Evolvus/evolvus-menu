const debug = require("debug")("evolvus-menuGroup:index");
const menuGroup = require("./db/menuGroup");
const menuGroupSchema = require("./model/menuGroupSchema").schema;

const menuItem = require("./db/menuItem");
const menuItemSchema = require("./model/menuItemSchema").schema;

const menuGroupItemMap = require("./db/menuGroupItemMap");
const menuGroupItemMapSchema = require("./model/menuGroupItemMapSchema").schema;
const validate = require("jsonschema")
  .validate;

module.exports.saveMenuGroup = (menuGroupObj) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate(menuGroupObj, menuGroupSchema);
      if (res.valid) {
        menuGroup.saveMenuGroup(menuGroupObj).then((menuGroup) => {
          debug(`saved successfully`, menuGroup);
          resolve(menuGroup);
        }).catch((e) => {
          debug(`exception on save ${e}`);
          reject(e);
        });
      } else {
        debug(`validation failed ${res.errors}`);
        reject("Validation Failed" + res.errors);
      }
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.saveMenuItem = (menuItemObj) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate(menuItemObj, menuItemSchema);
      if (res.valid) {
        menuItem.saveMenuItem(menuItemObj).then((menuItem) => {
          debug(`saved successfully`, menuItem);
          resolve(menuItem);
        }).catch((e) => {
          debug(`exception on save ${e}`);
          reject(e);
        });
      } else {
        debug(`validation failed ${res.errors}`);
        reject("Validation Failed" + res.errors);
      }
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.saveMenuGroupItemMap = (menuGroupItemMapObj) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate(menuGroupItemMapObj, menuGroupItemMapSchema);
      if (res.valid) {
        menuGroupItemMap.saveMenuGroupItemMap(menuGroupItemMapObj).then((menuGroupItemMap) => {
          debug(`saved successfully`, menuGroupItemMap);
          resolve(menuGroupItemMap);
        }).catch((e) => {
          debug(`exception on save ${e}`);
          reject(e);
        });
      } else {
        debug(`validation failed ${res.errors}`);
        reject("Validation Failed" + res.errors);
      }
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};