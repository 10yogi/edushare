var express = require('express');
const path =require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8089;
const keys = require('./config/keys')
var flash = require('connect-flash');

var  app = express();

var cookieSession = require('cookie-session');
var session = require('express-session');

const cookieParser = require('cookie-parser');


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use('/public',express.static(path.join(__dirname,'./public')));
app.use(express.static(path.join(__dirname,'./public')));

mongoose.connect(keys.mongodb.dbURI,{
  useNewUrlParser : true,
  useCreateIndex:true,
});


app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser(keys.cookiesession.cookieKey));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.cookiesession.cookieKey]
  })
);

//required for passport
app.use(session({
  secret : keys.session.secret,
  saveUninitialized : false,
  resave : false
}))

var  passport = require('./config/passport-config');
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');
app.use(routes);

app.listen(port,()=>{
  console.log(`magic happens on port ${port}`);
});

module.exports = app;