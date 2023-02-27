const { getRoomByID, updateRoomByID } = require("../utils/dataStore");

const enterRoom = (socket, payload) => {
  const currentRoom = getRoomByID(payload.roomId);
  if (currentRoom) {
    //check if room is already full.
    if (currentRoom.roomPlayers.length == currentRoom.roomSize) {
      socket.emit("joiningRoom", {
        status: 400,
        message: "room already full.",
      });
      return;
    }

    //add player to room
    currentRoom.roomPlayers.push({
      playerName: payload.playerName,
      playerSocketId: payload.socketId,
      admin: false,
    });
    updateRoomByID(currentRoom);

    // join socket group
    socket.join(currentRoom.roomId);

    //inform room members that player joined
    socket.to(currentRoom.roomId).emit(
      "/playerJoined",
      JSON.stringify({
        status: 200,
        data: currentRoom.roomPlayers,
      })
    );

    //send player room data.
    socket.emit(
      "joiningRoom",
      JSON.stringify({
        status: 200,
        data: currentRoom,
      })
    );

    //print members of room.
    console.log(getRoomByID(payload.roomId).roomPlayers);
  } else {
    console.log(">> room does not exist..");
    socket.emit(
      "joiningRoom",
      JSON.stringify({
        status: 400,
        message: "room with provided room id not found!!",
      })
    );
  }
  //   if (players.length == 8) {
  //     console.log("Room is full!!");
  //     socket.emit("success", "roomFull");
  //   } else {
  //     socket.join(data["roomId"]);
  //     const player = {
  //       playerName: data["playerName"],
  //       roomId: data["roomId"],
  //       socketId: data["socketId"],
  //     };
  //     players.push(player),
  //       console.log(
  //         "Room joined: " + data["roomId"] + " by " + data["playerName"]
  //       );
  //     // socket.to("abc").emit("success","true")
  //     console.log(data);
  //     socket.emit(
  //       "roomJoined",
  //       data["socketId"] + ":" + data["roomId"] + ":" + data["playerName"]
  //     );
  //     socket
  //       .to(data["roomId"])
  //       .emit(
  //         "roomJoined",
  //         data["socketId"] + ":" + data["roomId"] + ":" + data["playerName"]
  //       );
  //     // socket.to(data["roomId"]).emit("test","data")
  //   }

  //   socket.on("/enterRoom", (data) => {
  //     if (players.length == 8) {
  //       console.log("Room is full!!");
  //       socket.emit("success", "roomFull");
  //     } else {
  //       socket.join(data["roomId"]);
  //       const player = {
  //         playerName: data["playerName"],
  //         roomId: data["roomId"],
  //         socketId: data["socketId"],
  //       };
  //       players.push(player),
  //         console.log(
  //           "Room joined: " + data["roomId"] + " by " + data["playerName"]
  //         );
  //       // socket.to("abc").emit("success","true")
  //       console.log(data);
  //       socket.emit(
  //         "roomJoined",
  //         data["socketId"] + ":" + data["roomId"] + ":" + data["playerName"]
  //       );
  //       socket
  //         .to(data["roomId"])
  //         .emit(
  //           "roomJoined",
  //           data["socketId"] + ":" + data["roomId"] + ":" + data["playerName"]
  //         );
  //       // socket.to(data["roomId"]).emit("test","data")
  //     }

  //     // socket.emit("success","true")
  //   });
};

module.exports = {
  enterRoom,
};
