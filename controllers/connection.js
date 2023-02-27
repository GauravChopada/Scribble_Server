const { endpoints } = require("../utils/endpoints");
const { chooseWord } = require("./chooseWord");
const { createRoom } = require("./createRoom");
const { enterRoom } = require("./enterRoom");
const { getRoomPlayers } = require("./getRoomPlayers");
const { getWhiteboardRoomToken } = require("./getWhiteboardRoomToken");
const { getWhiteboardCredentials } = require("./getWhiteboardSDKToken");
const { leaveRoom } = require("./leaveRoom");
const { nextTurn } = require("./nextTurn");
const { sendMessage } = require("./sendMessage");
const { startGame } = require("./startGame");

const OnSocketConnection = (socket) => {
  socket.on(endpoints.testSocketConnection, (msg) => {
    console.log("Client Connected, Message: ", msg);
  });

  socket.on(endpoints.createRoom, (payload) => {
    createRoom(socket, payload);
  });

  socket.on(endpoints.enterRoom, (payload) => {
    enterRoom(socket, payload);
  });

  socket.on(endpoints.getRoomPlayers, (payload) => {
    getRoomPlayers(socket, payload);
  });

  socket.on(endpoints.leaveRoom, (payload) => {
    leaveRoom(socket, payload);
  });

  socket.on(endpoints.startGame, (payload) => {
    startGame(socket, payload);
  });

  socket.on(endpoints.nextTurn, (payload) => {
    nextTurn(socket, payload);
  });

  socket.on(endpoints.sendMessage, (payload) => {
    sendMessage(socket, payload);
  });
  socket.on(endpoints.chooseWord, (payload) => {
    chooseWord(socket, payload);
  });

  //   socket.on(endpoints.getWhiteboardRoomToken, (payload) => {
  //     getWhiteboardRoomToken(socket, payload);
  //   });

  //   socket.on(endpoints.getWhiteboardCredentials, (payload) => {
  //     getWhiteboardCredentials(socket, payload);
  //   });
};

module.exports = { OnSocketConnection };
