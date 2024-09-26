import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Configurar CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: "*", // Permitir solo el frontend (React)
    //methods: ["GET", "POST"],
  })
);

// Prueba de ruta
app.get("/", (req, res) => {
  res.send("¡Backend está funcionando!");
});

// Configurar Socket.io con CORS
const io = new SocketServer(server, {
  cors: {
    origin: "*", // Permitir la comunicación desde React
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
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

// Escuchar en el puerto adecuado para Vercel
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
