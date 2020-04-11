const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
let bodyParser = require("body-parser");
const path = require("path");

const app = express();

// JSON PARSER
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// Init Server and HTML Path

let server = http.createServer(app);
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "./public")));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
// Create a Socket.io Connection
let io = socketIO(server);
io.on("connect", (client) => {
  console.log("usuario conectado");

  client.on("disconnect", () => {
    console.log("usuario desconectado");
  });

  client.on("StreamVideo", (frame) => {
    console.log("transmision de video Activa");
    client.broadcast.emit("StreamVideo", frame);
  });

  client.on("ClassData", (classesDb) => {
    // Conversion Int to Class
    if (classesDb == 1) {
      classesDb = "arveja";
    }
    if (classesDb == 2) {
      classesDb = "frijol";
    }
    {
      if (classesDb == 3) {
        classesDb = "papa";
      }
      if (classesDb == 4) {
        classesDb = "pimenton";
      }
      if (classesDb == 5) {
        classesDb = "zanahoria";
      }
      if (classesDb == 6) {
        classesDb = "zaragoza";
      }
    }
    client.broadcast.emit("ClassData", classesDb);
  });

  client.on("ScoreData", (ScoresDb) => {
    client.broadcast.emit("ScoreData", ScoresDb);
  });
});

// Server listen port
server.listen(port, () => {
  console.log("Servidor iniciado en el puerto: " + port);
});
