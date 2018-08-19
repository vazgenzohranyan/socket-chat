import mongoose from 'mongoose';
import Promise from 'bluebird'

mongoose.Promise = Promise;
mongoose.set('debug',false);

const Client = mongoose.createConnection(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`);

Client.on('connected', () => {
  console.log('Mongoose connected!');
});

Client.on('disconnected', () => {
  console.log('Mongoose disconnected!');
});

Client.on('error', (err) => {
  console.error('Mongoose error', err);
});

global.MongoClient = Client

