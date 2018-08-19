import User from '../../db/models/user'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
  try {
    let {username, password } = req.body;

    let user = await User.findOne({ username: username, password: password})

    if(!user) {
      res.status(403).send('Username not found')

    }

    let token = jwt.sign({username:username}, process.env.JWT_SECRET)

    res.status(200).send({token:token})
  } catch (err) {
    console.error(err);
    res.send(500).send('Something is broke in server')
  }

}