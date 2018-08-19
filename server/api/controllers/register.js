import User from '../../db/models/user'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
  try {
    let {username, password } = req.body;

    let user = await User.findOne({ username: username})

    if(!user) {
      let user = await User.create({ username:username, password: password})

      let token = jwt.sign({username:username}, process.env.JWT_SECRET)

      res.status(200).send({token:token})
    }

    res.status(403).send('Username is busy')

  } catch (err) {
    console.error(err);
    res.send(500).send('Something is broke in server')
  }

}