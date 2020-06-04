const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

io.on("connection", (socket) => {
  console.log(`User connected using ${socket}`);

  // someone sent message to server, then send messages to all clients
  socket.on("chat message", (msg) =>
    socket.broadcast.emit("chat message", msg)
  );

  socket.on("disconnect", () => console.log("user disconnected"));
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
