const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo-dev:27017/CHAT_DB',  { useNewUrlParser: true }, (err) =>{
  if (err) {
    process.exit(1);
    console.log('DB NOT FOUND');
  } else {
    console.log('DB connection succes');
  }
});
mongoose.set('debug', true);

module.exports.mongoose = mongoose;
