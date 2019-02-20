var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  username:{type:String,unique:true},
  thumbnail: String,
  local : {
    password:String,
  },
  facebook:{
    facebookId : String,
    email:String,
    token : String,
  },
  myposts:[{ type: Schema.Types.ObjectId, ref:'Post'}],
  mylikes:[{ type: Schema.Types.ObjectId, ref:'Post' }]
});

userSchema.methods.generateHash = (password)=>{
  // console.log(password);
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};
userSchema.methods.validPassword = (password,hash)=>{
  return bcrypt.compareSync(password,hash);
};

module.exports = mongoose.model('User',userSchema);