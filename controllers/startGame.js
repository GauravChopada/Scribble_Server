const { updateRoomByID, getRoomByID } = require("../utils/dataStore");
const { getWhiteboardCredentials } = require("./getWhiteboardSDKToken");

const startGame = (socket, payload) => {
  const currentRoom = getRoomByID(payload.roomId);
  currentRoom.gameStarted = true;

  updateRoomByID(currentRoom.roomId);

  socket.emit(
    "/gameStarted",
    JSON.stringify({
      status: 200,
      data: currentRoom,
    })
  );

  socket.to(currentRoom.roomId).emit(
    "/gameStarted",
    JSON.stringify({
      status: 200,
      data: currentRoom,
    })
  );

  getWhiteboardCredentials(socket, payload);
};

module.exports = { startGame };
