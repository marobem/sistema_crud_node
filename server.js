var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

require('./backend/config/passport')(passport);
require('./backend/config/db');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({    
    cookie: { expires : new Date(Date.now() + 3600000)  }, // uma hora
    secret: 'blah',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('./frontend'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/frontend/app/views');

require('./backend/routes/routes.js')(app, passport);

app.listen(port);
console.log('Conectado na porta: ' + port);
