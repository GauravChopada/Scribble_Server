const { getRoomByID } = require("../utils/dataStore");

const getRoomPlayers = (socket, payload) => {
  const currentRoom = getRoomByID(payload.roomId);
  if (currentRoom) {
    socket.emit(
      "/getRoomPlayersResponse",
      JSON.stringify({ status: 200, data: currentRoom.roomPlayers })
    );
  } else {
    socket.emit(
      "/getRoomPlayersResponse",
      JSON.stringify({
        status: 400,
        message: "room with provided room id not found!!",
      })
    );
  }
};
module.exports = { getRoomPlayers };
