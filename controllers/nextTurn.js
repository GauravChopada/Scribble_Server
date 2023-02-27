const { updateRoomByID, getRoomByID } = require("../utils/dataStore");

const nextTurn = (socket, payload) => {
  console.log("next Turn");
  const currentRoom = getRoomByID(payload.roomId);
  currentRoom.currentChosenWord = "";
  // console.log("before" + currentRoom.currentTurn);
  if (currentRoom.currentTurn == currentRoom.roomPlayers.length - 1) {
    currentRoom.currentTurn = 0;
  } else {
    currentRoom.currentTurn = currentRoom.currentTurn + 1;
  }
  // console.log(currentRoom.currentTurn);

  updateRoomByID(currentRoom.roomId);

  socket.emit(
    "/nextTurnResponse",
    JSON.stringify({
      status: 200,
      nextTurnDetails: {
        currentTurnIndex: currentRoom.currentTurn,
        currentTurnPID: socket.id,
      },
    })
  );

  socket.to(currentRoom.roomId).emit(
    "/nextTurnResponse",
    JSON.stringify({
      status: 200,
      playerTurn: currentRoom.currentTurn,
      currentTurnPID: socket.id,
    })
  );
};

module.exports = { nextTurn };
