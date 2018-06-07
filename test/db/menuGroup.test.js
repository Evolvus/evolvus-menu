const debug = require("debug")("evolvus-menuGroup.test.db.menuGroup.test");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

var menuGroup = require("../../db/menuGroup");
var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://10.10.69.204/TestPlatform_Dev";

chai.use(chaiAsPromised);

describe("menuGroup db testing", () => {
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      done();
    });
  });
  var testmenuGroup = {
    "tenantId": "name",
    "menuGroupCode": "first",
    "applicationCode": "RTP",
    "mgtitle": "first menugroup"
  };
  var testmenuGroup1 = {
    "tenantId": "name",
    "menuGroupCode": "second",
    "applicationCode": "RTP",
    "mgtitle": "second menugroup"
  };
  describe("testing saveMenuGroup", () => {
    beforeEach((done) => {
      menuGroup.deleteAll().then((res) => {
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it("should  save a menuGroup into database", (done) => {
      let res = menuGroup.saveMenuGroup(testmenuGroup);
      expect(res).to.be.eventually.have.property("menuGroupCode")
        .to.equal(testmenuGroup.menuGroupCode)
        .notify(done);
    });

    it("should not  save a invalid menuGroup into database", (done) => {
      let res = menuGroup.saveMenuGroup({
        menuGroupId: 1
      });
      expect(res).to.be.rejectedWith("MenuGroup validation failed")
        .notify(done);
    });
  });

  describe("testing FindByCode", () => {
    beforeEach((done) => {
      menuGroup.deleteAll().then(() => {
        menuGroup.saveMenuGroup(testmenuGroup).then((res) => {
          done();
        });
      });
    });

    it("should return a menuGroup identified by Code", (done) => {
      let res = menuGroup.FindByCode("Dock");
      expect(res).to.be.eventually.be.a("object");
      expect(res).to.be.eventually.have.property("menuGroupCode")
        .to.deep.equal(testmenuGroup1.menuGroupCode);
      done();
    });

    it("should return empty object i.e {} as no menuGroup is identified by this Code ", (done) => {
      let res = menuGroup.FindByCode(1);
      expect(res).to.be.eventually.be.a("object");
      expect(res).to.be.eventually.not.have.property("menuGroupCode");
      expect(res).to.be.eventually.deep.equal({});
      done();
    });
  });

  describe("testing menuGroup.FindAllmenuGroup when data present", () => {
    // 1. Delete all records in the table and Insert two new records.
    // 2. Find -should return an array of size 2 with the  two menuGroup objects.

    beforeEach((done) => {
      menuGroup.deleteAll()
        .then((res) => {
          menuGroup.saveMenuGroup(testmenuGroup)
            .then((res) => {
              menuGroup.saveMenuGroup(testmenuGroup1)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it('should return 2 menuGroup objects', (done) => {
      let res = menuGroup.FindAllmenuGroup();
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(2);
          expect(docs[0].menuGroupCode)
            .to.equal(testmenuGroup.menuGroupCode);
          done();
        });
    });
  });

  describe('testing menuGroup.findAll when there is no data in database', () => {
    // 1.Delete all the records from database
    // 2.Query the databse , should return empty array
    beforeEach((done) => {
      menuGroup.deleteAll()
        .then(() => {
          done();
        });
    });

    it('should return empty array', (done) => {
      let res = menuGroup.FindAllmenuGroup();
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

  describe('testing update menuGroup', () => {
    //Delete all the recods from database
    //add 2 menuGroup
    let id;
    let update = {
      tenantId: "name",
      menuGroupCode: "first",
      applicationCode: "RTP",
      mgtitle: "first update menugroup"
    };
    beforeEach((done) => {
      menuGroup.deleteAll().then((res) => {
        menuGroup.saveMenuGroup(testmenuGroup).then((res) => {
          id = res._id;
          menuGroup.saveMenuGroup(testmenuGroup1).then((res) => {
            done();
          });
        });
      });
    });

    it('should update a menuGroup ', (done) => {
      menuGroup.updatemenuGroup(id, update).then((resp) => {
        var res = menuGroup.FindAllmenuGroup().then((menu) => {
          expect(menu).to.be.a('array');
          expect(menu.length).to.eql(2);
          expect(menu[0].menuGroupId).to.eql(update.menuGroupId);
          done();
        });
      });
    });

    it("should be rejected when there is no menuGroup matching the parameter code", (done) => {
      var res = menuGroup.updatemenuGroup("5b0fc57886ab1979ed77891b", update);
      expect(res).to.be.rejectedWith(`There is no such MenuGroup with id:5b0fc57886ab1979ed77891b`)
        .notify(done);
    });

    it("should be rejected when data to be updated is invalid", (done) => {
      var res = menuGroup.updatemenuGroup(id, testmenuGroup);
      expect(res).to.be.rejectedWith("Sorry! this data to be updated is invalid")
        .notify(done);
    });

    it("should be rejected for arbitrary object as Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value
      let invalidId = "some value";
      let res = menuGroup.updatemenuGroup(invalidId, update);
      expect(res)
        .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
        .notify(done);
    });
  });
});