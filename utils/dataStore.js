var rooms = [
  {
    roomId: "1234",
    roomName: "newroom",
    roomPlayers: [
      {
        playerName: "groot",
        playerSocketId: "cWpU1QtaWT_3w4vPAAAB",
        admin: true,
      },
    ],
    roomMessages: [
      {
        playerName: "groot",
        message: "hello everyone.",
        timeStamp: "",
      },
    ],
    roomSize: 8,
    currentTurn: 0,
    currentTurnPID: "",
    currentChosenWord: "",
    gameStarted: false,
    createdBy: { playerName: "groot", playerSocketId: "cWpU1QtaWT_3w4vPAAAB" },
  },
];

const getDefaultRoomObject = () => {
  return {
    roomId: "",
    roomName: "",
    roomPlayers: [],
    roomMessages: [],
    currentTurn: 0,
    currentTurnPID: "",
    currentChosenWord: "",
    gameStarted: false,
    createdBy: {
      playerName: "",
      playerSocketId: "",
    },
  };
};

const getAllRoomDetails = () => {
  return rooms;
};

const getRoomByID = (roomId) => {
  return rooms.find((room) => room.roomId === roomId);
};
const getRoomByName = (roomName) => {
  return rooms.find((room) => room.roomName === roomName);
};

const addRoom = (roomData) => {
  rooms.push(roomData);
};

const updateRoomByID = (newRoomData) => {
  const index = rooms.findIndex((room) => room.roomId === newRoomData.roomId);
  rooms[index] = newRoomData;
};

const deleteRoomById = (roomId) => {
  console.log(rooms);
  rooms = rooms.filter((room) => room.roomId !== roomId);
  console.log("After", rooms);
};

const getPlayerDetailsById = (roomId, playerSocketId) => {
  const currentRoom = getRoomByID(roomId);
  return currentRoom.roomPlayers.find(
    (player) => player.playerSocketId == playerSocketId
  );
};

module.exports = {
  deleteRoomById,
  getAllRoomDetails,
  getRoomByID,
  getRoomByName,
  getDefaultRoomObject,
  addRoom,
  updateRoomByID,
  getPlayerDetailsById,
};
