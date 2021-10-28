const path = require('path');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.static(path.join(__dirname, './build')));
app.use(express.json());

const rooms = new Map();

// Получение спика пользователей и сообщений во время присоединения в комнату
app.get('/rooms/:id', (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
      }
    : { users: [], messages: [] };
  res.json(obj);
});

// Создание комнаты
app.post('/rooms', (req, res) => {
  const { roomId, userName } = req.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }
  res.send();
});

const getUsers = (socket) => {
  rooms.forEach((value, roomId) => {
    if (value.get('users').delete(socket.id)) {
      const users = [...value.get('users').values()];
      return socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
    }
  });
};

io.on('connection', (socket) => {
  // Добавление пользователя в комнату
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);

    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users);
  });

  // Удаление пользователя с комнаты
  socket.on('ROOM:LEAVE', (roomId) => {
    socket.leave(roomId);
    
    getUsers(socket);
  });

  // Добавление нового сообщения
  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text }) => {
    const obj = {
      userName,
      text,
    };

    rooms.get(roomId).get('messages').push(obj);
    socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj);
  });

  // Удаление пользователя при дисконнекте
  socket.on('disconnect', () => {
    getUsers(socket);
  });

  console.log('User Connected:', socket.id);
});

const PORT = process.env.PORT || 9999;

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Сервер запущен');
});