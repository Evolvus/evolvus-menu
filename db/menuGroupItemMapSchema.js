const mongoose=require('mongoose');
var menuGroupItemMapSchema=new mongoose.Schema({
    menuGroupItemMapId: {
      type: Number,
      required:true,
      validate:{
        validator:Number.isInteger,
        message:'{VALUE} is not an Integer'
      }
    },
    menuGroupId: {
      type: Number
    },
    menuItemId: {
      type:Number
    },
    menuItemOrder: {
      type: Number
    },
     menuGroupItemMapCode:{
      type:Number
    },
    createdBy:{
      type:String
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
      type:String
      minlength:1,
      maxlength:100,

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
