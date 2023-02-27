const {
  getRoomByName,
  getDefaultRoomObject,
  addRoom,
} = require("../utils/dataStore");
const { v4: uuidv4 } = require("uuid");

const createRoom = (socket, payload) => {
  try {
    //create room
    const currentRoom = getDefaultRoomObject();
    currentRoom.roomId = uuidv4();
    currentRoom.roomName = payload.roomName;
    currentRoom.roomSize = 8;
    currentRoom.currentTurnPID = socket.id;
    currentRoom.createdBy.playerName = payload.playerName;
    currentRoom.createdBy.playerSocketId = payload.socketId;
    currentRoom.roomPlayers = [
      {
        playerName: payload.playerName,
        playerSocketId: payload.socketId,
        admin: true,
      },
    ];
    console.log(">> New Room Created..");
    addRoom(currentRoom);

    //logic for adding player in room
    socket.join(currentRoom.roomId);

    console.log(getRoomByName(payload.roomName));

    socket.emit(
      "creatingRoom",
      JSON.stringify({
        status: 200,
        data: currentRoom,
      })
    );
  } catch {
    (err) => {
      console.log("Error While creating room. Error: ", err);
      socket.emit("creatingRoom", {
        status: 400,
        message: "failed creating room",
      });
    };
  }
};

module.exports = { createRoom };
