import Message from '../../db/models/user'
import _ from 'underscore'

export default async (req, res) => {
  try {
    let user2 = req.query.id;
    let user1 = req.user._id;

    let messages = await Message.find({
      from: { $in: [user1, user2]},
      to: { $in: [user1, user2]},
    });

    if(!_.isArray(messages)) {
      res.status(200).send([])
    }

    res.send(200).send(messages)

  } catch (err) {
    console.error(err);
    res.send(500).send('Something is broke in server')
  }

}