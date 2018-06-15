const debug = require("debug")("evolvus-menu.test.db.menu");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const menu = require("../../db/menu");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/TestmenuCollection";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/menu.js
describe("db menu testing", () => {
  /*
   ** Before doing any tests, first get the connection.
   */
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  let object1 = {
    // add a valid menu object

  };
  let object2 = {
  // add a valid menu object

  };

  describe("testing menu.save", () => {
    // Testing save
    // 1. Valid menu should be saved.
    // 2. Non menu object should not be saved.
    // 3. Should not save same menu twice.
    beforeEach((done) => {
      menu.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid menu to database", (done) => {
      let testmenuCollection = {
        // add a valid menu object
      };
      let res = menu.save(testmenuCollection);
      expect(res)
        .to.eventually.include(testmenuCollection)
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {
      // not even a  object

      let invalidObject = {
        // add a invalid menu object

      };
      let res = menu.save(invalidObject);
      expect(res)
        .to.be.eventually.rejectedWith("menuCollection validation failed")
        .notify(done);
    });
  });

  describe("testing menu.findAll by limit",()=> {
    // 1. Delete all records in the table and insert
    //    4 new records.
    // find -should return an array of size equal to value of limit with the
    // roleMenuItemMaps.
    // Caveat - the order of the roleMenuItemMaps fetched is indeterminate

    // delete all records and insert four roleMenuItemMaps
      beforeEach((done)=> {
        menu.deleteAll().then(()=> {
          menu.save(object1).then((res)=> {
            menu.save(object2).then((res)=> {
              menu.save(object1).then((res)=> {
                menu.save(object2).then((res)=> {
                  done();
                });
              });
            });
          });
        });
      });

      it("should return limited number of records",(done)=> {
        let res = menu.findAll(3);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(3);
            expect(docs[0])
              .to.include(object1);
            done();
          }, (err) => {
            done(err);
          })
          .catch((e) => {
            done(e);
          });
      });

      it("should return all records if value of limit parameter is less than 1 i.e, 0 or -1",(done)=> {
        let res = menu.findAll(-1);
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(4);
            expect(docs[0])
              .to.include(object1);
            done();
          }, (err) => {
            done(err);
          })
          .catch((e) => {
            done(e);
          });
      });
  });

  describe("testing roleMenuItemMap.find without data", () => {
    // delete all records
    // find should return empty array
    beforeEach((done) => {
      menu.deleteAll()
        .then((res) => {
          done();
        });
    });

    it("should return empty array i.e. []", (done) => {
      let res = menu.findAll(2);
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(0);
          expect(docs)
            .to.eql([]);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing menu.findById", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by this id and it should return one menu
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    // 5. Query with arbitrary object
    let testObject = {
      //add a valid menu object

    };
    var id;
    beforeEach((done) => {
      menu.deleteAll()
        .then((res) => {
          menu.save(testObject)
            .then((savedObj) => {
              id = savedObj._id;
              done();
            });
        });
    });

    it("should return menu identified by Id ", (done) => {
      let res = menu.findById(id);
      expect(res)
        .to.eventually.include(testObject)
        .notify(done);
    });

    it("should return null as no menu is identified by this Id ", (done) => {
      let badId = new mongoose.mongo.ObjectId();
      let res = menu.findById(badId);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });

  describe("testing menu.findOne", () => {
    // Delete all records, insert two record
    // 1. Query by one attribute and it should return one menu
    // 2. Query by an arbitrary attribute value and it should return {}

    // delete all records and insert two menus
    beforeEach((done) => {
      menu.deleteAll()
        .then((res) => {
          menu.save(object1)
            .then((res) => {
              menu.save(object2)
                .then((savedObj) => {
                  done();
                });
            });
        });
    });

    it("should return object for valid attribute value", (done) => {
      // take one valid attribute and its value
      let attributename="";
      let attributeValue="";
      let res = menu.findOne(attributename, attributeValue);
      expect(res)
        .to.eventually.include(object1)
        .notify(done);
    });

    it("should return null as no menu is identified by this attribute ", (done) => {
      let res = menu.findOne(validAttribute, invalidValue);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });

  describe("testing menu.findMany", () => {
    // Delete all records, insert two record
    // 1. Query by one attribute and it should return all menus having attribute value
    // 2. Query by an arbitrary attribute value and it should return {}
    let menu1={
      //add valid object

    };
    let menu2={
      //add valid object with one attribute value same as "menu1"

    };
    // delete all records and insert two menus
    beforeEach((done) => {
      menu.deleteAll()
        .then((res) => {
          menu.save(menu1)
            .then((res) => {
              menu.save(menu2)
                .then((savedObj) => {
                  done();
                });
            });
        });
    });

    it("should return array of objects for valid attribute value", (done) => {
      // take one valid attribute and its value
      let attributename="";
      let attributeValue="";
      let res = menu.findMany(attributename, attributeValue);
      expect(res).to.eventually.be.a("array");
      //enter proper length according to input attribute
      expect(res).to.eventually.have.length(1);
      done();
    });

    it("should return empty array as no menu is identified by this attribute ", (done) => {
      let res = menu.findMany(validAttribute, invalidValue);
      expect(res)
        .to.eventually.to.eql([])
        .notify(done);
    });
  });
});
