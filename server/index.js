const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Users = require("./users");

const PORT = 3000 || process.env.PORT;

io.on("connection", (client) => {
  client.on("disconnect", () => console.log("User disconnected"));

  client.on("join", ({ name, room }, ack) => {
    const res = Users.addUser({ id: client.id, name, room });
    if (res.status === `SUCCESS`) {
      // send only this client the welcome message
      client.emit(`message`, {
        user: `admin`,
        txt: `Welcome to the ${room}, ${name}!`,
      });

      // let other clients know who has joined the room
      client.broadcast
        .to(room)
        .emit(`message`, { user: `admin`, txt: `${name} has joined the chat` });

      client.join(room);
    }
    ack(res);
  });

  client.on(`sendMessage`, (msg, ack) => {
    const res = getUser(socket.id);
    if (res.status === `SUCCESS`) {
      const user = data;
      io.to(user.room).emit(`message`, { user: user.name, txt: msg });
    }
    ack(res);
  });
});

app.use(require("./router"));

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
