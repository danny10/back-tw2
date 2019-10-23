var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');

// Import user model and passport settings
require('./models/user');
require('./passport')(passport);

var app = express();

//Enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Configuración (Puerto de escucha, sistema de plantillas, directorio de vistas,...)
app.set('port', process.env.PORT || 3000); //Port Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(methodOverride());

// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(path.join(__dirname, 'public')));
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
app.use(express.session({ secret: 'lollllo' }));

//Passport configuration We initialize it and we indicate that Passport handles the Session
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

//show us a more detailed log
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//Application paths
app.get('/', routes.index);

// Application  Passport 
app.get('/logout', function(req, res) {

    req.logout(); 
    req.session.destroy();
    res.redirect('http://localhost:4200/#/home');
});



//Route to authenticate with Twitter
app.get('/auth/twitter', passport.authenticate('twitter'));

//Route to redirect after authenticating with Twitter.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: 'http://localhost:4200/#/vista', failureRedirect: 'http://localhost:4200/#/home' }));


//import routes
var userRoutes = require('./routes/user');
var tweetsRoutes = require('./routes/tweets');

//routes
app.use('/listUser', userRoutes);
app.use('/tweets', tweetsRoutes);

//Connection to the bd
// mongoose.connect('mongodb://localhost:27017/twitter', function(err, res) {
//     if (err) throw err;
//     console.log('base de datos \x1b[32m%s\x1b[0m', 'online');
// });


mongoose.connection.openUri('mongodb+srv://admin:897454dfgdfjgf@pruebatw-dxklo.mongodb.net/twitter?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;
        console.log('Basde de datos: \x1b[32m%s\x1b[0m', 'online');
    });

app.listen(app.get('port'), function() {
    console.log('Express server puerto ' + app.get('port') + ' \x1b[32m%s\x1b[0m', 'online');
});