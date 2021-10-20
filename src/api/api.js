import axios from "axios";

export const chatAPI = {
  getRoomData(roomId) {
    try {
      return axios.get(`/rooms/${roomId}`);
    } catch (error) {
      console.error(`Ошибка при получении данных о комнате: ${error}`);
    }
  },
  createRoom(obj) {
    try {
      return axios.post("/rooms", obj);
    } catch (error) {
      console.error(`Ошибка при создании комнаты: ${error}`);
    }
  },
}