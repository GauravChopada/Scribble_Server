const express = require("express");
var http = require("http");
const cors = require("cors");
const { OnSocketConnection } = require("./controllers/connection.js");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
require("dotenv").config();

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
//middLewre
app.use(express.json());
app.use(cors());

var players = [];
var sockets = [];
var messages = [];

var currentTurn = 0;

var currentWord = "";
var gameStarted = false;

// console.log("whiteboard", process.env.WHITEBOARD_AK);

var ak = process.env.WHITEBOARD_AK;
var sk = process.env.WHITEBOARD_SK;
var token = process.env.WHITEBOARD_TOKEN;

io.on("connection", (socket) => {
  OnSocketConnection(socket);
  // sockets.push(socket.id);
  // console.log("members in array");
  // sockets.forEach((so) => {
  //   console.log(so);
  // });
  // console.log("connected");
  // console.log(socket.id + " is socket id.\n");

  // socket.on("getPlayers", (data) => {
  //   console.log("Started" + players.length);
  //   var data = "";
  //   for (let x in players) {
  //     data +=
  //       players[x].playerName +
  //       ":" +
  //       players[x].roomId +
  //       ":" +
  //       players[x].socketId +
  //       ":";
  //   }
  //   console.log(data);
  //   socket.emit("getPlayersResponse", data);
  //   socket.to(data).emit("getPlayersResponse", data);
  // });

  // socket.on("leaveRoom", (room) => {
  //   var i = 0;
  //   var data = "";
  //   while (i < players.length) {
  //     if (players[i].socketId == socket.id) {
  //       players.splice(i, 1);
  //       break;
  //     } else {
  //       data +=
  //         players[i].playerName +
  //         ":" +
  //         players[i].roomId +
  //         ":" +
  //         players[i].socketId +
  //         ":";
  //     }
  //     i++;
  //   }
  //   console.log("left room"), console.log(players);
  //   console.log(data);
  //   socket.to(room).emit("getPlayersResponse", data);
  //   socket.leave(room);
  // });

  socket.on("getSdkToken", async (data) => {
    const {
      sdkToken,
      TokenPrefix1,
    } = require("./node_modules/netless-token/dist/index.js");

    console.log("getSdkToken");

    const SDKToken = sdkToken(
      ak, // Fill in the AK you get from Agora Console
      sk, // Fill in the SK you get from Agora Console
      0, // Token validity period in milliseconds. If you set it to 0, the token will never expire
      {
        role: 0, // Define the permissions granted by the token. You can set it to 0 (Admin), 1 (Writer), or 2 (Reader)
      }
    );

    console.log("sdkToken: " + SDKToken);

    // const response = await fetch('https://api.netless.link/v5/rooms', {
    //   method: 'POST', // string or object
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'token': token,
    //     'region': 'in-mum'
    //   }
    // });

    // const myJson = await response.json();

    // console.log(myJson);

    socket.emit("getSdkTokenResponse", SDKToken);
  });

  socket.on("getRoomToken", (roomUUID) => {
    const {
      roomToken,
      TokenPrefix2,
    } = require("./node_modules/netless-token/dist/index.js");

    console.log("getRooomData");

    const RoomToken = roomToken(ak, sk, 1000 * 60 * 10, {
      role: 0, // Define the permissions granted by the token. You can set it to 0 (Admin), 1 (Writer), or 2 (Reader)
      uuid: roomUUID, // Fill in the Room UUID. You can get it by calling the RESTful API to create a room or get a room list
    });
    console.log("RoomToken: " + RoomToken);
    socket.emit("getRoomTokenResponse", RoomToken);
  });

  // socket.on("startGame", (data) => {
  //   console.log(
  //     "startGame event triggered.. turn=" +
  //       currentTurn +
  //       "total players: " +
  //       players.length
  //   );
  //   gameStarted = true;
  //   socket
  //     .to(data)
  //     .emit(
  //       "startGameResponse",
  //       players[currentTurn].playerName + ":" + players[currentTurn].socketId
  //     );
  //   socket.emit(
  //     "startGameResponse",
  //     players[currentTurn].playerName + ":" + players[currentTurn++].socketId
  //   );
  //   if (currentTurn == players.length) currentTurn = 0;
  // });

  // socket.on("nextTurn", (data) => {
  //   currentWord = "";
  //   console.log("nextTurn event triggered.. turn=" + currentTurn);
  //   socket
  //     .to(data)
  //     .emit(
  //       "nextTurnResponse",
  //       players[currentTurn].playerName + ":" + players[currentTurn].socketId
  //     );
  //   socket.emit(
  //     "nextTurnResponse",
  //     players[currentTurn].playerName + ":" + players[currentTurn++].socketId
  //   );
  //   if (currentTurn == players.length) currentTurn = 0;
  // });

  // socket.on("choseWord", (data) => {
  //   datalist = data.split(":");
  //   currentWord = datalist[0];
  //   console.log("choseWord event triggered.. word=" + datalist[0]);
  //   socket.to(datalist[1]).emit("choseWordResponse", datalist[0]);
  //   // socket.emit("choseWordResponse",datalist[0])
  // });

  // socket.on("sendMessage", (data) => {
  //   console.log("sendMessage event triggered.. message=" + data["message"]);
  //   var i = 0;
  //   var senderName = "";
  //   while (i < players.length) {
  //     if (players[i].socketId == socket.id) {
  //       senderName = players[i].playerName;
  //     }
  //     i++;
  //   }
  //   if (data["message"] == currentWord) {
  //     socket
  //       .to(data["roomId"])
  //       .emit(
  //         "receiveMessage",
  //         senderName + ":" + senderName + " guessed correct word"
  //       );
  //     // socket.emit("receiveMessage",senderName+":" +senderName + " guessed correct word")
  //     // console.log("inside..")
  //   } else {
  //     const message = {
  //       messageText: data["message"],
  //       roomId: data["roomId"],
  //     };
  //     messages.push(message);
  //     var response = senderName + ":" + message.messageText;
  //     console.log(response);
  //     socket.to(data["roomId"]).emit("receiveMessage", response);
  //     socket.emit("receiveMessage", response);
  //   }
  // });

  // socket.on("test2", (data) => {
  //   console.log(data), socket.to("Room1").emit("event", "Someone joined...");
  // });

  // socket.on("test", (data) => {
  //   socket.join("abc");
  //   console.log(data), socket.emit("success", "you joined");
  //   socket.to("abc").emit("success", "Someone joined...");
  // });

  // socket.on("/joinRoom", (room) => {
  //   socket.join(room), console.log("Room joined: " + room);
  //   // socket.emit("success","true")
  // });

  // socket.emit("send", "receive from server");

  // socket.on("disconnect", function () {
  //   // emitVisitors();
  //   var i = sockets.indexOf(socket.id);
  //   sockets.splice(i, 1);
  //   console.log("Rem members in array");
  //   // sockets.forEach(so => {
  //   //   console.log(so)
  //   // });
  //   console.log("user disconnected");
  // });
});

server.listen(port, () => {
  console.log("server started");
});
