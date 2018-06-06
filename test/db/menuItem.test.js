const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

var menuItem = require("../../db/menuItem");
var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://10.10.69.204/TestPlatform_Dev";
chai.use(chaiAsPromised);

describe("menuItem db testing", () => {
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      done();
    });
  });

  var testItem1 = {
    "tenantId":"name",
    "menuItemType": "quicklink",
    "applicationCode": "flux",
    "menuItemCode": "mi1",
    "createdBy": "pavithra",
    "creationDate": new Date().toISOString(),
    "title": "menu item1"
  };
  var testItem2 = {
    "tenantId":"name",
    "menuItemType": "quicklink",
    "applicationCode": "flux",
    "menuItemCode": "mi2",
    "createdBy": "usha",
    "creationDate": new Date().toISOString(),
    "title": "menu item 2"
  };
  describe("testing saveMenuItem", () => {
    beforeEach((done) => {
      menuItem.deleteAll().then((res) => {
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it("should  save a menuItem into database", (done) => {
      let res = menuItem.saveMenuItem(testItem1);
      expect(res).to.be.eventually.have.property("menuItemCode")
        .to.equal(testItem1.menuItemCode)
        .notify(done);
    });

    it("should not  save a invalid menuItem into database", (done) => {
      let res = menuItem.saveMenuItem({
        menuItemId: 1
      });
      expect(res).to.be.rejectedWith("MenuItem validation failed")
        .notify(done);
    });
  });


  describe("testing FindByCode", () => {
    beforeEach((done) => {
      menuItem.deleteAll().then(() => {
        menuItem.saveMenuItem(testItem1).then((res) => {
          done();
        });
      });
    });

    it("should return a menuItem identified by Code", (done) => {
      let res = menuItem.FindByCode("for");
      expect(res).to.be.eventually.be.a("object");
      expect(res).to.be.eventually.have.property("menuItemCode")
        .to.deep.equal(testItem1.menuItemCode);
      done();
    });
    it("should return empty object i.e {} as no menuItem is identified by this Code ", (done) => {
      let res = menuItem.FindByCode(4);
      expect(res).to.be.eventually.be.a("object");
      expect(res).to.be.eventually.not.have.property("menuItemCode");
      expect(res).to.be.eventually.deep.equal({});
      done();
    });
  });

  describe("testing menuItem.FindAllMenuItem when data present", () => {
    // 1. Delete all records in the table and Insert two new records.
    // 2. Find -should return an array of size 2 with the  two menuItem objects.

    beforeEach((done) => {
      menuItem.deleteAll()
        .then((res) => {
          menuItem.saveMenuItem(testItem1)
            .then((res) => {
              menuItem.saveMenuItem(testItem2)
                .then((res) => {
                  done();
                });
            });
        });
    });


    it('should return 2 menuItem objects', (done) => {
      let res = menuItem.FindAllMenuItem();
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(2);
          expect(docs[0].menuItemId)
            .to.equal(testItem1.menuItemId);
          done();
        });
    });
  });



  describe('testing update menuItem', () => {
    //Delete all the recods from database
    //add 2 menuItem
    let id;
    let update = {
      tenantId:"name",
      menuItemType: "quicklink",
      applicationCode: "flux",
      menuItemCode: "mi3",
      createdBy: "pavithrat",
      creationDate: new Date().toISOString(),
      title: "menu item"
    };
    beforeEach((done) => {
      menuItem.deleteAll().then((res) => {
        menuItem.saveMenuItem(testItem1).then((res) => {
          id = res._id;
          menuItem.saveMenuItem(testItem2).then((res) => {
            done();
          });
        });
      });
    });

    it('should update a menuItem ', (done) => {
      menuItem.updateMenuItem(id, update).then((resp) => {
        var res = menuItem.FindAllMenuItem().then((menu) => {
          expect(menu).to.be.a('array');
          expect(menu.length).to.eql(2);
          expect(menu[0].menuItemId).to.eql(update.menuItemId);
          done();
        });
      });
    });

    it("should be rejected when there is no menuItem matching the parameter id", (done) => {
      var res = menuItem.updateMenuItem("5b0f997fa78a7634c59b8236", update);
      expect(res).to.be.rejectedWith(`There is no such MenuItem with id:5b0f997fa78a7634c59b8236`)
        .notify(done);
    });

    it("should be rejected when data to be updated is invalid", (done) => {
      var res = menuItem.updateMenuItem(id, testItem1);
      expect(res).to.be.rejectedWith("Sorry! this data to be updated is invalid")
        .notify(done);
    });

    it("should be rejected for arbitrary object as Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value
      let invalidId = "some value";
      let res = menuItem.updateMenuItem(invalidId, update);
      expect(res)
        .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
        .notify(done);
    });
  });
});
