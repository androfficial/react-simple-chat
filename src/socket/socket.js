import io from "socket.io-client";

export const Types = {
  SET_USERS: "ROOM:SET_USERS",
  NEW_MESSAGE: "ROOM:NEW_MESSAGE",
  ROOM_JOIN: "ROOM:JOIN",
};

const socket = io();

export default socket;