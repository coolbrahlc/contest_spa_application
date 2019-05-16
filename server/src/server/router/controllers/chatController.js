const { ApplicationError, UnauthorizedError, UserNotFoundError} = require('../../utils/customErrrors/errors');
const { controller }  = require('../../router/controllers/socketController');
const { getChatUsers } = require('../../router/controllers/userController');

const { Room, Message} = require('../../db/mongoModels/chatModels');

module.exports.updateRoom = async (req, res, next) => {
  try {
    const {body, sender, receiver, _id, isNewDialog} = req.body;
    const message = new Message({
      sender: sender,
      body: body
    });
    await message.save();
    const isUpdated = await Room.updateOne( {_id}, {"$push": { "messages": message }});
    if (isNewDialog) {
      const updated = await Room.findOne({ _id }).lean();
      const length = updated.messages.length;
      updated.lastMessage = updated.messages[length-1];
      updated.participants = await getChatUsers(updated.participants);
      controller.emitNewMessage({ updated, roomId: _id, sender, receiver, message });
      res.send(updated);
    } else {
      controller.emitNewMessage({ roomId: _id, sender, receiver, message });
      res.send(isUpdated);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

//Start conversation
module.exports.getRoom =  async (req, res, next) => {
  try {
    let offset = 0;
    const {user1, user2, _id, skip} = req.body;
    if (skip) {
      offset=skip
    }
    const end = offset+10;
    let room;
    if (_id) {
      room = await Room.findOne({ _id } ).lean();  //{messages: { $slice:[offset, end] } }
      const messages = room.messages.reverse();
      room.haveMore = true;
      if (offset===messages.length || end>messages.length ){
        room.haveMore = false;
      }
      room.messages= messages.slice(offset,end).reverse()
    } else {
      room = await Room.findOne({  $or: [ {participants: [user1, user2]}, {participants: [user2, user1] } ] }).lean();
      if (!room) {
        room = new Room({ participants: [user1, user2] });
        room.save();
        room = Object.assign({}, room.toJSON() );
      }
    }
    room.participants = await getChatUsers(room.participants);
    res.send(room);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

//LIST ALL MY CONVERSATIONS
module.exports.listAllRooms =  async (req, res, next) => {
  try {
    const {myId} = req.body ;
    let rooms = await Room.aggregate([
        {$match: {participants: myId}},
        {$unwind: '$messages'},
        {$sort: {'messages.created_at': -1}},
        {$group: {_id: '$_id',  participants: { $first: "$participants" }, 'lastMessage': {$push: '$messages'} }},
        {$project: {lastMessage: '$lastMessage', participants: 1}},
        {$sort: {'messages.created_at': -1}},
    ]);
    const promises = rooms.map(async (room) => {
      room.participants= await getChatUsers(room.participants);
      room.lastMessage= room.lastMessage[0];
      return room
    });
    Promise.all(promises)
    .then((rooms) => {
      const sorted = rooms.sort((a, b) => (a.lastMessage.created_at < b.lastMessage.created_at) ? 1 : -1);
      res.send(sorted)
    });
  } catch (e) {
    next(e);
  }
};

// module.exports.getConversation =  async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     console.log(id)
//
//     const room = await Room.findOne({  _id:id });
//     console.log('ROOOOOM', room);
//     res.send(room);
//   } catch (e) {
//     next(e);
//   }
// };
