var express = require('express');

var User = require('../models/user');

var app = express();


//list user
app.get('/', (req, res) => {

    User.find()
        .exec((err, userlist) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando los usuarios',
                    errors: err

                });
            }

            res.status(200).json({

                ok: true,
                userlist: userlist,

            });

        });
});


//Delete user
app.delete('/delete', (req, res) => {

    User.deleteMany((err, userDelete) => {

        if (err) {
            return res.status(500).json({

                ok: false,
                mensaje: 'Error al borrar el usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            userDelete: userDelete
        });

       // res.clearCookie("key");


    });

});


module.exports = app;