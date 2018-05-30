const debug = require("debug")("evolvus-menuGroup:db:menuGroup");
const mongoose = require("mongoose");
const menuGroupSchema = require('./menuGroupSchema');
const ObjectId = require("mongodb").ObjectID;

//Creates menuGroup collection in database
var menuGroup = mongoose.model("menuGroup", menuGroupSchema);


// Stores the menuGroup object into database
module.exports.savemenuGroup = (menuGroupObj) => {
  return new Promise((resolve, reject) => {
    try {
      var menuGroup = new menuGroup(menuGroupObj);
      menuGroup.save().then((menu) => {
        debug("saved successfully", menu.menuGroupId);
        resolve(menu);
      }, (err) => {
        debug(`failed to save with an error ${err}`);
        reject(err);
      }).catch((e) => {
        debug(`exception on save ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

//Finds one menuGroup by its code and updates it with new values
module.exports.updatemenuGroup = (id, update) => {
  return new Promise((resolve, reject) => {
    try {
      menuGroup.findById({
        _id: new ObjectId(id)
      }).then((menu) => {
        if (menu) {
          var updateObject = new menuGroup(update);
          var errors = updateObject.validateSync();
          if (errors != null) {
            throw new Error(`IllegalArgumentException: ${errors.message}`);
          }
          menuGroup.update({
            _id: id
          }, {
            $set: update
          }).then((response) => {
            if (response.nModified === 0) {
              debug("failed to update");
              reject("Sorry! this data to be updated is invalid or you are trying to update with the same values");
            } else {
              debug("updated successfully");
              resolve(response);
            }
          });
        } else {
          debug(`menuGroup not found with id, ${id}`);
          reject(`There is no such menuGroup with id:${id}`);
        }
      }).catch((e) => {
        debug(`exception on findById ${e}`);
        reject(e.message);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e.message);
    }
  });
};

// Finds the application object for the code parameter from the application collection
// If there is no object matching the code, return empty object i.e. {}
// Should return a Promise
module.exports.FindByCode = (codevalue) => {
  return new Promise((resolve, reject) => {
    try {
      menuGroup.findOne({
        menuGroupCode: codevalue
      }).then((menu) => {
        if (menu) {
          debug(`menuGroup found ${menu.menuGroupId}`);
          resolve(menu);
        } else {
          // return empty object in place of null
          debug("menuGroup not found");
          resolve({});
        }
      }).catch((e) => {
        debug(`failed to find the menuGroup with error ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};


//Returns all the application entities
module.exports.FindAllmenuGroup = () => {
  return menuGroup.find({});
};

//Deletes all the records from the database
//Used only for testing
module.exports.deleteAll = () => {
  return menuGroup.remove({});
};
