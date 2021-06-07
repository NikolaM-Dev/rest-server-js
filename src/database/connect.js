const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Database connected');
  } catch (error) {
    console.error('db error', error);
    process.exit(1);
  }
};

module.exports = connect;
