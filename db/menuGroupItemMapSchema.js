const mongoose=require('mongoose');
var menuGroupItemMapSchema=new mongoose.Schema({
    menuGroupItemMapId: {
      type: String,
      required:true
      // validate:{
      //   validator:Number.isInteger,
      //   message:'{VALUE} is not an Integer'
      // }
    },
    applicationCode:{
      type:String,
      minlength:1,
      maxlength:4,
      required:true
    },
    verifiedFlag:{
      type:Number
    },
    menuGroupId: {
      type: String,
      required:true
    },
    menuItemId: {
      type:String,
      required:true
    },
    menuItemOrder: {
      type: Number
    },
     menuGroupItemMapCode:{
      type:String,
      minlength:1,
      unique: true,
      maxlength:50,
      required:true
    },
    createdBy:{
      type:String,
      minlength:1,
      maxlength:100
    },
    creationDate:{
      type:Date
    },
    lastUpdatedDate:{
      type:Date
    },
    updatedBy:{
      type:String,
      minlength:1,
      maxlength:100
    },
    langCode:{
      type:String,
      minlength:1,
      maxlength:100
    },
    enabledFlag:{
      type:String
    }

  });

module.exports=menuGroupItemMapSchema;
