import socket from 'socket.io'
import jwt from 'jsonwebtoken'
import Message from '../db/models/message'
import redis from 'socket.io-redis'

export default async function start(server) {
  try {
    let io = socket(server);

    io.adapter(redis({ host: 'localhost', port: 6379 }));

    io.use((socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function(err, decoded) {
          if(err) return next(new Error('Authentication error'));
          socket.decoded = decoded;
          next();
        });
      } else {
        next(new Error('Authentication error'));
      }
    });

    io.on('connection', async (socket) => {
      try {
        console.log('New client connected');

        await RedisClient.set(socket.decoded.username, socket.id)

        socket.on('message', async (to,msg) => {
          try {
            await Message.create({from:socket.decoded.username, to: to, content:msg});

            let user = await RedisClient.get(to)

            if(user) {
              socket.to(user).emit('message', msg)
            }

          } catch (err) {
            console.error(err)
          }
        });

        socket.on('message_to_room', (id,msg) => {
          socket.to(id).emit(msg)
        })

        socket.on('join', (id) => {
          socket.join(id, ()=> {
            io.to(id).emit('A new user has joined the room');
          })
        })

        socket.on('get_rooms', ()=> {
          io.of('/').adapter.allRooms((err, rooms) => {
            socket.emit('rooms', rooms)
          });
        })

        socket.on('disconnect', (reason) => {
          console.log(reason);
        });

        socket.on('error', (err) => {
          console.log(err);
          socket.emit(err);
          socket.disconnect();
        })

      } catch (err) {
        console.error(err)
      }

    })
  } catch (err) {
    console.error(err)
  }

}