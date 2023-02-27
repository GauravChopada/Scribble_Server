const { updateRoomByID, getRoomByID } = require("../utils/dataStore");

const chooseWord = (socket, payload) => {
  console.log("chooseWord");
  const currentRoom = getRoomByID(payload.roomId);
  currentRoom.currentChosenWord = payload.chosenWord;

  updateRoomByID(currentRoom.roomId);

  socket.to(currentRoom.roomId).emit(
    "/wordChoseResponse",
    JSON.stringify({
      status: 200,
      chosenWord: payload.chosenWord,
      // playerTurn: currentRoom.roomPlayers[currentRoom.currentTurn],
    })
  );
};

module.exports = { chooseWord };
