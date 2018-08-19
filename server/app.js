import express from 'express'
import http from 'http'
import env from './env'
import './db/connection/mongo'
import './db/connection/redis'
import routes from './api/index.js'
import body_parser from 'body-parser'
import cors from 'cors'
import ConnectRedis from './db/connection/redis'
import start from './socketService'

(async function run() {

  try {
    let app = express();
    let server = http.Server(app)

    app.use(cors())
    app.use(body_parser.json())
    app.use(body_parser.urlencoded())

    app.use(routes())

    await start(server)

    server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
      console.log(`Server running at ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    })
  } catch (err) {
    console.error(err)
  }
})();