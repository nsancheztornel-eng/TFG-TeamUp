const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde las carpetas 'public' y raíz
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de conexiones en tiempo real con Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('joinRoom', (data) => {
    const room = typeof data === 'string' ? data : (data?.room || 'general');
    socket.join(room);
    console.log(`Usuario ${socket.id} se unió a la sala: ${room}`);
  });

  socket.on('sendMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('createTask', (task) => {
    socket.broadcast.emit('taskCreated', task);
  });

  socket.on('updateTask', (task) => {
    socket.broadcast.emit('taskUpdated', task);
  });

  socket.on('contactRequest', (data) => {
    socket.broadcast.emit('contactRequestReceived', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor TeamUp ejecutándose correctamente en: http://localhost:${PORT}`);
});