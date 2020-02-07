const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

// Define the database model
const MessageSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'OrderId is required.']
  },
  message: {
    type: String,
    required: [true, 'Message is required.']
  }
});

// Use the unique validator plugin
MessageSchema.plugin(unique, { message: 'The {PATH} is already existed.' });

const Message = module.exports = mongoose.model('message', MessageSchema);



// clean DB
Message.collection.drop();
// init data
for (let i=5; i>0; i--) {
  let newMessage = new Message({
    orderId: i.toString(),
    message: 'message ' + i
  });

  Message.collection.update({ orderId : i.toString() }, newMessage, { upsert : true });
}
