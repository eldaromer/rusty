module.exports = class {

  constructor(connId, io) {
    this.sockets = {};
    this.id = connId;
    setInterval(() => {
      io.to(this.id).emit("tick", {
        some: "data"
      })
    }, 1000)
  }

  connect(socket) {
    if (Object.keys(this.sockets).length === 2) {
      return false;
    }
    socket.join(this.id);
    socket.on("disconnect", () => {
      console.log(socket.id + " disconnected");
      delete this.sockets[socket.id];
    });
    this.sockets[socket.id] = socket;
    return true;
  }
};
