var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Model the user
var UserSchema = new Schema({
    name: { type: String, required: [true, 'The name is necessary'] },
    username: { type: String, required: [true, 'The username is necessary'] },
    provider: { type: String, required: [true, 'The provider is necessary'] },
    provider_id: { type: String, unique: true, required: [true, 'The provider_id is necessary'] },
    photo: { type: String, required: [true, 'The photo is necessary'] },
    createdAt: { type: Date }
});


module.exports = mongoose.model('User', UserSchema);
//var User = mongoose.model('User', UserSchema);