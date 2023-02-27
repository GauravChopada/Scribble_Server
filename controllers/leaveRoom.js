const {
  getRoomByID,
  updateRoomByID,
  deleteRoomById,
} = require("../utils/dataStore");

const leaveRoom = (socket, payload) => {
  console.log(payload);
  console.log("socket id", socket.id);
  const currentRoom = getRoomByID(payload.roomId);
  const currentPlayer = currentRoom.roomPlayers.find(
    (player) => player.playerSocketId == socket.id
  );
  if (currentRoom) {
    if (currentPlayer.admin) {
      console.log("in admin block");
      deleteRoomById(currentRoom.roomId);
      socket.emit(
        "/leaveRoomResponse",
        JSON.stringify({
          status: 200,
          message: "Left Room Successfully!!",
        })
      );

      socket.to(currentRoom.roomId).emit(
        "/adminLeft",
        JSON.stringify({
          status: 200,
          message: "Room is discarded because admin left the room.",
        })
      );
    } else {
      currentRoom.roomPlayers = currentRoom.roomPlayers.filter(
        (player) => player != currentPlayer
      );
      console.log(currentRoom.roomPlayers);
      updateRoomByID(currentRoom);
      socket.emit(
        "/leaveRoomResponse",
        JSON.stringify({
          status: 200,
          message: "Left Room Successfully!!",
        })
      );
      socket.to(currentRoom.roomId).emit(
        "/playerLeft",
        JSON.stringify({
          status: 200,
          player: currentPlayer,
          data: currentRoom.roomPlayers,
        })
      );
    }
  } else {
    socket.emit(
      "/leaveRoomResponse",
      JSON.stringify({
        status: 400,
        message: "room with provided room id not found!!",
      })
    );
  }
};

module.exports = { leaveRoom };
