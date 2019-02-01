var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  local : {
    username: String,
    password:String,
    thumbnail:String,
  },
  facebook:{
    username:String,
    facebookId : String,
    thumbnail: String,
    email:String,
    token : String,
  },
});

userSchema.methods.generateHash = (password)=>{
  console.log(password);
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};
userSchema.methods.validPassword = (password,hash)=>{
  return bcrypt.compareSync(password,hash);
};

module.exports = mongoose.model('User',userSchema);