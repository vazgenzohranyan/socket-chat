import jwt from 'jsonwebtoken'
import _ from 'underscore'
import User from '../../db/models/user'

export default async function (req, res, next) {
  try {
    let { token } = req.headers;
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      return next()
    }

    if (!_.isObject(decoded)) {
      return next()
    }

    let user = await User.findOne({ username: decoded.username })
    if (!user) {
      res.status(403).send("Auth error")
    }

    req.user = user
    next()
  } catch (err) {
    console.error('Error while handling check user Auth', err)
    res.status(500).end()
  }
}