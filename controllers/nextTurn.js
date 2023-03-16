const { updateRoomByID, getRoomByID } = require("../utils/dataStore");
const { sendMessage } = require("./sendMessage");

const nextTurn = (socket, payload) => {
  console.log("next Turn request from : ", socket.id);
  const currentRoom = getRoomByID(payload.roomId);
  currentRoom.currentChosenWord = "";
  // console.log("before" + currentRoom.currentTurn);
  if (currentRoom.currentTurn == currentRoom.roomPlayers.length - 1) {
    currentRoom.currentTurn = 0;
  } else {
    currentRoom.currentTurn = currentRoom.currentTurn + 1;
  }
  console.log(currentRoom.currentTurn);

  updateRoomByID(currentRoom.roomId);

  sendMessage(socket, { roomId: payload.roomId, message: "New game started" });

  socket.emit(
    "/nextTurnResponse",
    JSON.stringify({
      status: 200,
      nextTurnDetails: {
        currentTurnIndex: currentRoom.currentTurn,
        currentTurnPID:
          currentRoom.roomPlayers[currentRoom.currentTurn].playerSocketId,
      },
    })
  );

  socket.to(currentRoom.roomId).emit(
    "/nextTurnResponse",
    JSON.stringify({
      status: 200,
      nextTurnDetails: {
        currentTurnIndex: currentRoom.currentTurn,
        currentTurnPID:
          currentRoom.roomPlayers[currentRoom.currentTurn].playerSocketId,
      },
    })
  );
};

module.exports = { nextTurn };
