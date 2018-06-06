const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

var menuGroupItemMap= require("../../db/menuGroupItemMap");
var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://10.10.69.204/Platform_Dev";

chai.use(chaiAsPromised);

describe("MenuGroupItemMap db testing", () => {
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      done();
    });
  });
  var testMenu= {
    "menuGroupId":"12",
    "menuItemId":"46",
    "menuGroupItemMapCode":"110",
    "applicationCode":"flux",
    "menuGroupItemMapId":"1256",

    "createdBy": "vigneshp",
    "createdDate": Date.now()
  };
  var testMenu1 = {
    "menuGroupId":"1",
    "menuItemId":"4",
    "menuGroupItemMapCode":"10",
    "applicationCode":"flux",
    "menuGroupItemMapId":"12560",
    "createdBy": "vijaykumarR",
    "createdDate": Date.now()
  };
  describe("testing saveMenuGroupItemMap", () => {
      beforeEach((done) => {
        menuGroupItemMap.deleteAll().then((res) => {
          done();
        }).catch((e) => {
          done(e);
        });
      });

  it("should  save a menuGroupItemMap into database", (done) => {
    let res = menuGroupItemMap.saveMenuGroupItemMap(testMenu);
    expect(res).to.be.eventually.have.property("menuGroupItemMapCode")
    .to.equal(testMenu.menuGroupItemMapCode)
    .notify(done);
      });

    it("should not save a invalid menuGroupItemMap into database", (done) => {
      let res = menuGroupItemMap.saveMenuGroupItemMap({
      menuGroupId: 1
      });
      expect(res).to.be.rejectedWith("MenuGroupItemMap validation failed")
      .notify(done);
      });
      });

    describe("testing FindByCode", () => {
    beforeEach((done) => {
  menuGroupItemMap.deleteAll().then(() => {
  menuGroupItemMap.saveMenuGroupItemMap(testMenu).then((res) => {
          done();
        });
      });
    });

    it("should return a menuGroupItemMap identified by Code", (done) => {
          let res = menuGroupItemMap.FindByCode("Dock");
          expect(res).to.be.eventually.be.a("object");
          expect(res).to.be.eventually.have.property("menuGroupItemMapCode")
            .to.deep.equal(testMenu.menuGroupItemMapCode);
          done();
        });

    it("should return empty object i.e {} as no menuGroupItemMap is identified by this Code ", (done) => {
              let res = menuGroupItemMap.FindByCode("docks");
              expect(res).to.be.eventually.be.a("object");
              expect(res).to.be.eventually.not.have.property("menuGroupItemMapCode");
              expect(res).to.be.eventually.deep.equal({});
              done();
            });
          });

  describe("testing menuGroupItemMap.FindAllMenuGroupItemMap when data present", () => {
    // 1. Delete all records in the table and Insert two new records.
    // 2. Find -should return an array of size 2 with the  two menuGroupItemMap objects.

    beforeEach((done) => {
      menuGroupItemMap.deleteAll()
        .then((res) => {
          menuGroupItemMap.saveMenuGroupItemMap(testMenu)
            .then((res) => {
              menuGroupItemMap.saveMenuGroupItemMap(testMenu1)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it('should return 2 menuGroupItemMap objects', (done) => {
    let res = menuGroupItemMap.FindAllMenuGroupItemMap();
    expect(res)
      .to.be.fulfilled.then((docs) => {
        expect(docs)
          .to.be.a('array');
        expect(docs.length)
          .to.equal(2);
        expect(docs[0].menuGroupItemMapId)
          .to.equal(testMenu.menuGroupItemMapId);
        done();
      });
  });
});

describe('testing menuGroupItemMap.findAll when there is no data in database', () => {
    // 1.Delete all the records from database
    // 2.Query the databse , should return empty array
    beforeEach((done) => {
      menuGroupItemMap.deleteAll()
        .then(() => {
          done();
        });
    });

    it('should return empty array', (done) => {
          let res = menuGroupItemMap.FindAllMenuGroupItemMap();
          expect(res)
            .to.be.fulfilled.then((docs) => {
              expect(docs)
                .to.be.a('array');
              expect(docs.length)
                .to.equal(0);
              expect(docs)
                .to.eql([]);
              done();
            });
        });
      });

describe('testing update menuGroupItemMap', () => {
          //Delete all the recods from database
          //add 2 menuGroupItemMap
          let id;
          let update = {
            menuGroupItemMapId:"wer",
            menuGroupItemMapCode:"mgimc" ,
            menuGroupId:"first",
            menuItemId:"mia" ,
            createdBy: "vigneshp",
            applicationCode:"flux",
            createdDate: Date.now()
          };
          beforeEach((done) => {
            menuGroupItemMap.deleteAll().then((res) => {
              menuGroupItemMap.saveMenuGroupItemMap(testMenu).then((res) => {
                id = res._id;
                menuGroupItemMap.saveMenuGroupItemMap(testMenu1).then((res) => {
                  done();
                });
              });
            });
          });

    it('should update a menuGroupItemMap ', (done) => {
  menuGroupItemMap.updateMenuGroupItemMap(id, update).then((resp) => {
      var res = menuGroupItemMap.FindAllMenuGroupItemMap().then((menu) => {
        expect(menu).to.be.a('array');
        expect(menu.length).to.eql(2);
        expect(menu[0].menuGroupItemMapId).to.eql(update.menuGroupItemMapId);
        done();
      });
    });
  });

  it("should be rejected when there is no menuGroupItemMap matching the parameter id", (done) => {
      var res = menuGroupItemMap.updateMenuGroupItemMap("5b0f9913f29d9e535c3bff15", update);
      expect(res).to.be.rejectedWith("There is no such MenuGroupItemMap with id:5b0f9913f29d9e535c3bff15")
        .notify(done);
    });

    it("should be rejected when data to be updated is invalid", (done) => {
          var res = menuGroupItemMap.updateMenuGroupItemMap(id, testMenu);
          expect(res).to.be.rejectedWith("Sorry! this data to be updated is invalid")
            .notify(done);
        });

  it("should be rejected for arbitrary object as Id parameter ", (done) => {
              // an id is a 12 byte string, -1 is an invalid id value
              let invalidId = "some value";
              let res =menuGroupItemMap.updateMenuGroupItemMap(invalidId, update);
              expect(res)
                .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
                .notify(done);
            });
 });
});
