import express from 'express'
import controllers  from './controllers'
import checkAuth from './middlewares'

export default function routes() {
  let router = express.Router()

  router.post('/register', controllers.register);
  router.get('/messages/:id', checkAuth, controllers.getMessages);
  router.post('/login', controllers.login)

  return router
}

