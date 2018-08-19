import mongoose from 'mongoose'

let messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: { type: String}
});

export default MongoClient.model('message', messageSchema)