module.exports = class {
  constructor(connId, io) {
    this.id = connId;
  }

  connect(socket) {
    socket.join(this.id);
  }
};
