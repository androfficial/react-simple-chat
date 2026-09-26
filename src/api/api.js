import axios from "axios";

export const chatAPI = {
  getRoomData(roomId) {
    try {
      return axios.get(`/rooms/${roomId}`);
    } catch (error) {
      console.error(`Error fetching room data: ${error}`);
    }
  },
  createRoom(obj) {
    try {
      return axios.post("/rooms", obj);
    } catch (error) {
      console.error(`Error creating room: ${error}`);
    }
  },
}