const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

// Define the database model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  orderId: {
    type: String,
    required: [true, 'OrderId is required.']
  }
});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'The {PATH} is already existed.' });

const User = module.exports = mongoose.model('user', UserSchema);



// clean DB
User.collection.drop();
// init data
for (let i=5; i>0; i--) {
  let newUser = new User({
    name: 'Patient'+i,
    orderId: i.toString()
  });

  User.collection.update({ name : newUser.name }, newUser, { upsert : true });
}
