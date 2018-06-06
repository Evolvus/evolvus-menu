const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

var menuGroup = require("../index");
var db = require("../db/menuGroup");

var menuItem = require("../index");
var db = require("../db/menuItem");

var menuGroupItemMap = require("../index");
var db = require("../db/menuGroupItemMap");
var MONGO_DB_URL = process.env.MONGODB_URI || "mongodb://10.10.69.204/Platform_Dev";

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
    menuGroupId:"mgg1",
    menuGroupCode: "firstt",
  applicationCode: "RTP",
    title: "first menugroup"
  };
  var testmenuGroup1 = {
    menuGroupId:"mg2",
    menuGroupCode: "second",
    applicationCode: "RTP",
    title: "second menugroup"
  };
  
  describe("Testing saveMenuGroup", () => {
  beforeEach((done) => {
    db.deleteAll().then((res) => {
      done();
    }).catch((e) => {
      done(e);
    });
  });

  it("should save a menuGroup to database", (done) => {
    let res = menuGroup.saveMenuGroup(testmenuGroup);
    expect(res).to.be.eventually.a("object")
      .to.have.property("menuGroupId")
      .to.eql(testmenuGroup.menuGroupId)
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
});


describe("Testing index.js", () => {
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      done();
    });
  });
  var testItem1={
    menuItemId:"1a",
    menuGroupId:"1g",
    applicationCode:"flux",
    menuItemCode:"mia",
    createdBy:"pavithra",
    creationDate:new Date().toISOString()
  };
  var testItem2={
    menuItemId:"2a",
    menuGroupId:"2g",
    applicationCode:"flux",
    menuItemCode:"mi2",
    createdBy:"usha",
    creationDate:new Date().toISOString()
  };
  describe("Testing saveMenuItem", () => {
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it("should save a menuItem to database", (done) => {
      let res = menuItem.saveMenuItem(testItem1);
      expect(res).to.be.eventually.a("object")
        .to.have.property("menuItemId")
        .to.eql(testItem1.menuItemId)
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


describe("Testing index.js", () => {
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      done();
    });
  });

  var testMenu = {
    menuGroupId:"first",
    menuItemId:"mia",
    menuGroupItemMapCode:"Docks",
    applicationCode:"flux",
    menuGroupItemMapId:"5",
      createdBy: "SYSTEM",
      createdDate: new Date().toISOString()
    };

    var testMenu1 = {
    menuGroupId:"firstt",
    menuItemId:"mi2",
    menuGroupItemMapCode:"Dock",
    applicationCode:"flux",
    menuGroupItemMapId:"6",
    createdBy: "SYSTEM 1",
    createdDate: new Date().toISOString()
  };

  describe("Testing saveMenuGroupItemMap", () => {
      beforeEach((done) => {
        db.deleteAll().then((res) => {
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
