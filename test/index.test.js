const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

var menuGroup = require("../index");
var menuGroupDb = require("../db/menuGroup");

var menuItem = require("../index");
var menuItemDb = require("../db/menuItem");

var menuGroupItemMap = require("../index");
var menuGroupItemMapDb = require("../db/menuGroupItemMap");
var MONGO_DB_URL = process.env.MONGODB_URI || "mongodb://10.10.69.204/TestPlatform_Dev";

chai.use(chaiAsPromised);

describe("Testing index.js", () => {
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      done();
    });
  });
  var testmenuGroup = {
    "tenantId": "IVL",
    "menuGroupCode": "chd",
    "mgtitle": "Mandate",
    "menuGroupType": "global",
    "applicationCode": "HODE"
  };
  var testmenuGroup1 = {
    tenantId: "name",
    menuGroupCode: "first",
    applicationCode: "RTP",
    mgtitle: "first update menugroup"
  };

  describe("Testing saveMenuGroup", () => {
    beforeEach((done) => {
      menuGroupDb.deleteAll().then((res) => {
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it("should save a menuGroup to database", (done) => {
      let res = menuGroup.saveMenuGroup(testmenuGroup);
      expect(res).to.be.eventually.a("object")
        .to.have.property("menuGroupCode")
        .to.eql(testmenuGroup.menuGroupCode)
        .notify(done);
    });

    it("should be rejected with Validation Error", (done) => {
      let res = menuGroup.saveMenuGroup({
        menuGroupId: 100
      });
      expect(res).to.be.rejectedWith("Validation Failed")
        .notify(done);
    });
  });



  describe("Testing saveMenuItem index.js", () => {
    before((done) => {
      mongoose.connect(MONGO_DB_URL);
      let connection = mongoose.connection;
      connection.once("open", () => {
        done();
      });
    });
    var testItem1 = {
      tenantId: "name",
      menuItemType: "quicklink",
      applicationCode: "flux",
      menuItemCode: "mi3",
      createdBy: "pavithrat",
      creationDate: new Date().toISOString(),
      title: "menu item"
    };
    var testItem2 = {
      tenantId: "name",
      menuItemType: "quicklink",
      applicationCode: "flux",
      menuItemCode: "mi3",
      createdBy: "pavithrat",
      creationDate: new Date().toISOString(),
      title: "menu item"
    };
    describe("Testing saveMenuItem", () => {
      beforeEach((done) => {
        menuItemDb.deleteAll().then((res) => {
          done();
        }).catch((e) => {
          done(e);
        });
      });

      it("should save a menuItem to database", (done) => {
        let res = menuItem.saveMenuItem(testItem1);
        expect(res).to.be.eventually.a("object")
          .to.have.property("menuItemCode")
          .to.eql(testItem1.menuItemCode)
          .notify(done);
      });

      it("should be rejected with Validation Error", (done) => {
        let res = menuItem.saveMenuItem({
          menuItemId: 100
        });
        expect(res).to.be.rejectedWith("Validation Failed")
          .notify(done);
      });
    });
  });


  describe("Testing menuGroupItemMap index.js", () => {
    before((done) => {
      mongoose.connect(MONGO_DB_URL);
      let connection = mongoose.connection;
      connection.once("open", () => {
        done();
      });
    });

    var testMenu = {
      tenantId: "name",
      menuGroupItemMapCode: "mgimc",
      menuGroupId: "first",
      menuItemId: "mia",
      createdBy: "vigneshp",
      applicationCode: "flux",
      createdDate: Date.now()
    };

    var testMenu1 = {
      tenantId: "name",
      menuGroupItemMapCode: "mgimc",
      menuGroupId: "first",
      menuItemId: "mia",
      createdBy: "vigneshp",
      applicationCode: "flux",
      createdDate: Date.now()
    };

    describe("Testing saveMenuGroupItemMap", () => {
      beforeEach((done) => {
        menuGroupItemMapDb.deleteAll().then((res) => {
          done();
        }).catch((e) => {
          done(e);
        });
      });

      it("should save a menuGroupItemMap to database", (done) => {
        let res = menuGroupItemMap.saveMenuGroupItemMap(testMenu);
        expect(res).to.be.eventually.a("object")
          .to.have.property("menuGroupItemMapCode")
          .to.eql(testMenu.menuGroupItemMapCode)
          .notify(done);
      });

      it("should be rejected with Validation Error", (done) => {
        let res = menuGroupItemMap.saveMenuGroupItemMap({
          menuGroupItemMapId: 1
        });
        expect(res).to.be.rejectedWith("Validation Failed")
          .notify(done);
      });
    });
  });
});