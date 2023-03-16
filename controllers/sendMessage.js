const {
  getPlayerDetailsById,
  updateRoomByID,
  getRoomByID,
} = require("../utils/dataStore");

const sendMessage = (socket, payload) => {
  console.log("sendMessage event triggered ..");

  const currentRoom = getRoomByID(payload.roomId);

  const senderDetails = getPlayerDetailsById(payload.roomId, socket.id);

  const message = {
    message:
      payload.message == currentRoom.currentChosenWord
        ? "guessed correct word"
        : payload.message,
    playerName: senderDetails.playerName,
  };

  currentRoom.roomMessages.push(message);

  updateRoomByID(currentRoom);

  socket.emit(
    "/sendMessageResponse",
    JSON.stringify({
      status: 200,
      message: message,
    })
  );

  socket.to(currentRoom.roomId).emit(
    "/sendMessageResponse",
    JSON.stringify({
      status: 200,
      message: message,
    })
  );
};

module.exports = { sendMessage };
