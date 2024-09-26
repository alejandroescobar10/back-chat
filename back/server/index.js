import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Configurar CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir solo el frontend (React)
    //methods: ["GET", "POST"],
  })
);

// Configurar Socket.io con CORS
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173", // Permitir la comunicación desde React
    methods: ["GET", "POST"],
  },
});

//Conexión de clientes
io.on("connection", (socket) => {
  console.log(socket.id); // Verificar la conexión del cliente

  // Escuchar mensajes entrantes
  socket.on("message", (body) => {
    console.log(body); // Verificar que el mensaje está siendo recibido
    // Emitir mensaje a todos los clientes excepto al que lo envió
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

server.listen(4000);
console.log("Server on port", 4000);
