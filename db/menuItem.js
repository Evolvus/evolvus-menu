const debug = require("debug")("evolvus-menuItem:db:menuItem");
const mongoose = require("mongoose");
const menuItemSchema = require('./menuItemSchema');
const ObjectId = require("mongodb").ObjectID;

//Creates Menu Item collection in database
var MenuItem = mongoose.model("MenuItem", menuItemSchema);

//Stores the menuItem object into database
module.exports.saveMenuItem = (menuItemObj) => {
  return new Promise((resolve, reject) => {
    try {
      var menuitem = new MenuItem(menuItemObj);
      menuitem.save().then((menu) => {
        debug("saved successfully", menu.menuItemId);
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

///Finds one application by its code and updates it with new values
module.exports.updateMenuItem = (id, update) => {
  return new Promise((resolve, reject) => {
    try {
      MenuItem.findById({
        _id: new ObjectId(id)
      }).then((menu) => {
        if (menu) {
          var updateObject = new MenuItem(update);
          var errors = updateObject.validateSync();
          if (errors != null) {
            throw new Error(`IllegalArgumentException: ${errors.message}`);
          }
          MenuItem.update({
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
          debug(`MenuItem not found with id, ${id}`);
          reject(`There is no such MenuItem with id:${id}`);
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

//Finds the menuitem object for the code parameter from the menuitem collection
//If there is no object matching the code, return empty object i.e. {}
//Should return a Promise
module.exports.FindByCode = (codevalue) => {
  return new Promise((resolve, reject) => {
    try {
      MenuItem.findOne({
        menuitemCode: codevalue
      }).then((menu) => {
        if (menu) {
          debug(`application found ${menu.menuItemCode}`);
          resolve(menu);
        } else {
          // return empty object in place of null
          debug("application not found");
          resolve({});
        }
      }).catch((e) => {
        debug(`failed to find the application with error ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

//Returns all the menuItem entities
module.exports.FindAllMenuItem = () => {
  return MenuItem.find({});
};

//Deletes all the records from the database
//Used only for testing
module.exports.deleteAll = () => {
  return MenuItem.remove({});
};