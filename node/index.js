const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const env = require('./env')

// const port = 5000
const port = Number(env.PORT)
//route
const route = require('./routes');
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require('cors');
app.use(cors());

//link mongooseDB
const db = require('./conf/db');
db.main();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

route(app);

const { Server } = require('socket.io');
//socket
const server = require('http').createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

////////////////////////////
const ChatRoom = require('./models/chatRoom');

io.on('connection', async (socket) => {
  console.log("New client connected" + socket.id);

  // server lắng nghe dữ liệu từ socket
  socket.on('send_message', async (data) => {
    try {
      const { message, roomId, is_admin } = data;
      const chatRoom = await ChatRoom.findById(roomId)
      chatRoom.text.push({ message, is_admin, date: new Date() })
      await chatRoom.save()

      //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các socket khác
      io.emit('receive_message', 'success');
    } catch (err) {
      io.emit('receive_message', 'fail');
    }
  });

  socket.on('createRoom', (data) => {
    io.emit('createdRoom', 'success');
  })

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

server.listen(port)

