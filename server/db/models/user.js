import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
  username: { type:String, unique: true, required: true },
  password: { type: String, required: true},
  token: {type: String, unique:true}
})

export default MongoClient.model('user', userSchema)