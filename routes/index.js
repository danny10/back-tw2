
exports.index = function(req, res){

  res.render('index', {
    // Enviamos como variables un título
    // y objeto 'user' que contiene toda
    // la información del usuario y viaja en el 'request'
    title: 'Passport JS',
    user: req.user
  });
};
