const axios = require("axios");
const {
  sdkToken,
  roomToken,
} = require("../node_modules/netless-token/dist/index.js");

const getWhiteboardCredentials = async (socket, payload) => {
  var ak = process.env.WHITEBOARD_AK;
  var sk = process.env.WHITEBOARD_SK;
  const url = "https://api.netless.link/v5/rooms";
  var SDKTOKEN =
    "NETLESSSDK_YWs9RzhDNWRCR0RPUDhsZFVWbyZub25jZT1kZjFhOWI2MC04NWFlLTExZWQtYTZiNi1kMWMxNDFkZWRiMjYmcm9sZT0wJnNpZz03ZTk1MTVhNjk2MDcyYzFjNGNhNjllZjAyMTgzMzBkMmUxMGQ2ZWM0MDgxZTNkN2UwMzNmY2Q5YmY0ZjQ4YjRk";

  var whiteboardCredentials = {
    sdkToken: SDKTOKEN,
    roomUUID: "",
    roomToken: "",
  };

  //   const SDKToken = sdkToken(
  //     ak, // Fill in the AK you get from Agora Console
  //     sk, // Fill in the SK you get from Agora Console
  //     0, // Token validity period in milliseconds. If you set it to 0, the token will never expire
  //     {
  //       role: 0, // Define the permissions granted by the token. You can set it to 0 (Admin), 1 (Writer), or 2 (Reader)
  //     }
  //   );

  const header = {
    headers: {
      token: whiteboardCredentials.sdkToken,
      region: "in-mum",
    },
  };
  const response = await axios
    .post(url, {}, header)
    .catch((err) => console.log(err));
  whiteboardCredentials.roomUUID = response.data.uuid;

  const _roomToken = roomToken(ak, sk, 1000 * 60 * 10, {
    role: 0, // Define the permissions granted by the token. You can set it to 0 (Admin), 1 (Writer), or 2 (Reader)
    uuid: whiteboardCredentials.roomUUID, // Fill in the Room UUID. You can get it by calling the RESTful API to create a room or get a room list
  });
  whiteboardCredentials.roomToken = _roomToken;
  console.log(whiteboardCredentials);

  socket.emit(
    "/getWhiteboardCredentialsResponse",
    JSON.stringify({
      status: 200,
      whiteboardCredentials: whiteboardCredentials,
    })
  );

  socket.to(payload.roomId).emit(
    "/getWhiteboardCredentialsResponse",
    JSON.stringify({
      status: 200,
      whiteboardCredentials: whiteboardCredentials,
    })
  );
};

module.exports = { getWhiteboardCredentials };
