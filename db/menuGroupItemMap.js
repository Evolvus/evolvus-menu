const debug = require("debug")("evolvus-menuGroupItemMap:db:menuGroupItemMap");
const mongoose = require("mongoose");
const menuGroupItemMapSchema = require('./menuGroupItemMapSchema');
const ObjectId = require("mongodb").ObjectID;
//Creates MenuGroupItemMap collection in database
var MenuGroupItemMap = mongoose.model("MenuGroupItemMap", menuGroupItemMapSchema);

// Stores the MenuGroupItemMap object into database
module.exports.saveMenuGroupItemMap= (menuGroupItemMapObj) => {

  return new Promise((resolve, reject) => {
    try {
      var menuGroupItemMap = new MenuGroupItemMap(menuGroupItemMapObj);
        menuGroupItemMap.save().then((menu) => {
        debug("saved successfully", menu.menuGroupItemMapCode);
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

//Finds one MenuGroupItemMap by its code and updates it with new values
module.exports.updateMenuGroupItemMap = (id, update) => {
  return new Promise((resolve, reject) => {
    try {
      MenuGroupItemMap.findById({
        _id: new ObjectId(id)
      }).then((menu) => {
        if (menu) {

          var updateObject = new MenuGroupItemMap(update);
          var errors = updateObject.validateSync();
          if (errors != null)
         {

           throw new Error(`IllegalArgumentException${errors.message}`);

          }
          MenuGroupItemMap.update({
        _id: id
          }, {
            $set: update
            }).then((response) => {
            if (response.nModified === 0) {
              debug("failed to update");
              reject("Sorry! this data to be updated is invalid or you are trying to update with the same values");
            } else{
              debug("updated successfully");
              resolve(response);
            }
          });
        } else {
          debug(`MenuGroupItemMap not found with id, ${id}`);
          reject(`There is no such MenuGroupItemMap with id:${id}`);
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

// Finds the MenuGroupItemMap object for the code parameter from the MenuGroupItemMap collection
// If there is no object matching the code, return empty object i.e. {}
// Should return a Promise
module.exports.FindByCode = (codevalue) => {

  return new Promise((resolve, reject) => {
    try {
      MenuGroupItemMap.findOne({
           menuGroupItemMapCode: codevalue
      }).then((menu) => {
        if (menu) {
          debug(`MenuGroupItemMap found ${menu.menuGroupItemMapId}`);
          resolve(menu);
        } else {
          // return empty object in place of null
          debug("MenuGroupItemMap not found");
          resolve({});
        }
      }).catch((e) => {
        debug(`failed to find the MenuGroupItemMap with error ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};


//Returns all the MenuGroupItemMap entities
module.exports.FindAllMenuGroupItemMap = () => {
  return MenuGroupItemMap.find({});
};
//
//Deletes all the records from the database
//Used only for testing
module.exports.deleteAll = () => {
  return MenuGroupItemMap.remove({});
 };
