const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
let bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();

// DATABASE CONNECTION
const dbCon = {
  host: "database-1.coxt8euwrxba.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "carpediem0599",
  database: "database-1",
};

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

  client.on("ClassData", (classesDb) => {
    // Conversion Int to Class
    // Conversion Int to Class
    if (classesDb == 1) {
      classesDb = "Bandeja";
    }
    if (classesDb == 2) {
      classesDb = "Penne Bueno";
    }
    {
      if (classesDb == 3) {
        classesDb = "Penne Malo";
      }
      if (classesDb == 4) {
        classesDb = "Tornillo Bueno";
      }
      if (classesDb == 5) {
        classesDb = "Tornillo Malo";
      }
      if (classesDb == 6) {
        classesDb = "Codo Bueno";
      }
      if (classesDb == 7) {
        classesDb = "Codo Malo";
      }
      if (classesDb == 8) {
        classesDb = "Spaghetti Bueno";
      }
      if (classesDb == 9) {
        classesDb = "Spaghetti Malo";
      }
      if (classesDb == 10) {
        classesDb = "Concha Buena";
      }
      if (classesDb == 11) {
        classesDb = "Concha Mala";
      }
    }
    client.broadcast.emit("ClassData", classesDb);
  });

  client.on("ScoreData", (ScoresDb) => {
    client.broadcast.emit("ScoreData", ScoresDb);
  });

  client.on("formattime", (formatTime) => {
    client.broadcast.emit("formattime", formatTime);
  });
});

const search = (request, response) => {
  const con = mysql.createConnection(dbCon);
  con.connect();
  const sql = `SELECT classes AS classes, scores AS scores, formatTime AS formatTime 
              FROM database1
              WHERE datetime BETWEEN ${request.query.initTime} and ${request.query.finalTime};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    response.json(result);
  });
  con.end();
};

app.get("/search", search);

// Server listen port
server.listen(port, () => {
  console.log("Servidor iniciado en el puerto: " + port);
});
