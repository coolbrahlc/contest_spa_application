const socketio =require('socket.io');
const ROLES = {
  ROLE_SENDER: 'sender',
  ROLE_RECEIVER: 'receiver'
};

class SockerListener {
  connect(httpServer) {
    this.io = socketio.listen(httpServer);
    this.listen();
    this.onlineUsers = [];
  }

  listen() {
    this.io.on('connection', (socket)=> {
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.onDisconnect(socket);
    });
  }

  onDisconnect(socket) {
    socket.on('disconnect', () =>{
      const index = this.onlineUsers.findIndex(el => el.socket===socket);
      if (index>-1) {
        const socket =  this.onlineUsers[index];
        if (socket.id) {
          this.io.emit('userDisconnected', socket.id);
        }
      }
      this.onlineUsers.splice(index, 1);
    });
  }

  onSubscribe(socket) {
    socket.on('subscribe', (id) => {
      this.onlineUsers.push({socket, id});
      const onlineUsers = this.onlineUsers.map(el=> el.id);
      socket.join(id);
      this.io.emit('userJoinedOnline', id);
      this.io.to(id).emit('onlineUsers', onlineUsers);
    });
  }

  onUnsubscribe(socket) {
    socket.on('unsubscribe', (id) => {
      const index = this.onlineUsers.findIndex(el => el.id===id);
      this.onlineUsers.splice(index, 1);
      this.io.emit('userDisconnected', id);
      socket.leave(id);
    });
  }

  emitEntryCreated (data)  {
    const { contestCreator, contest_id } = data;
    this.io.to(contestCreator).emit('showNewEntry', contest_id);
  }

  emitNewMessage (data)  {
    const { roomId, sender, receiver, message, updated } = data;
    //console.log(receiver, sender, ' receiver, sender, ');
    const dataReceiver =Object.assign({}, data );
    dataReceiver.id = receiver;
    dataReceiver.role = ROLES.ROLE_RECEIVER;
    this.io.to(receiver).emit('newChatMessage', dataReceiver);

    const dataSender =Object.assign({}, data );
    dataSender.id = sender;
    dataSender.role = ROLES.ROLE_SENDER;
    this.io.to(sender).emit('newChatMessage', dataSender);
  }

  emitEntryWon (data) {
    const { creatorId, contestId } = data;
    this.io.to(creatorId).emit('ShowToWinner', contestId);
  };
  emitEntryReviewResult(data) {
    const { entryCreator, status, answer } = data;
    this.io.to(entryCreator).emit('entryReviewResult', data);
  };
}

let controller = new SockerListener();

module.exports.controller = controller;
